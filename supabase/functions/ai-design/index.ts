// Setup: npm install openai @supabase/supabase-js @google/generative-ai
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4.28.0";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";
import {
    getTechnicalSpecs,
    analyzeUsage,
    analyzeCompetitor
} from "./knowledge-base.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use the provided key or fallback to env var
// SECURITY NOTE: It is best practice to move this to Supabase Secrets in production
const GEMINI_KEY = Deno.env.get('GEMINI_API_KEY') || 'AIzaSyCwF1yd_R394X8A8ujDkhG4PwYKTF8w3Dc';

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const {
            business_type,
            product_type,
            volume_estimate,
            brand_style,
            text_on_bag,
            business_name,
            usage_details,
            competitor_inspiration
        } = await req.json();

        // Initialize Clients
        const openai = new OpenAI({
            apiKey: Deno.env.get('OPENAI_API_KEY'),
        });

        const genAI = new GoogleGenerativeAI(GEMINI_KEY);
        const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Generate Strategic Advice (Text) - USING GEMINI
        const specs = getTechnicalSpecs(product_type);
        const usageRecs = usage_details ? analyzeUsage(usage_details) : [];

        let technicalContext = "";
        if (specs) {
            technicalContext = `
SPÉCIFICATIONS TECHNIQUES (Catalogue EONITE 2024):
- Produit: ${specs.nom}
- Grammage recommandé: ${specs.grammage}
- Finitions disponibles: ${(specs.finitions || []).join(', ')}
- Conseil technique: ${specs.conseil_technique}
`;
        }

        const systemPrompt = `Tu es EON, le conseiller technique et marketing expert d'EONITE.
TON EXPERTISE:
- Maîtrise des grammages et finitions (pelliculage, marquage à chaud, etc.)
- Standards qualité FSC, encres végétales

TON STYLE:
- Termes techniques précis mais accessibles
- Enthousiaste mais professionnel
- Propose toujours une solution "Bespoke" (sur-mesure)

CONTEXTE TECHNIQUE:
${technicalContext}

CONSIGNES:
1. Donne un conseil technique personnalisé (3-4 phrases).
2. Mentionne au moins une spécification technique.
3. Termine par une phrase d'encouragement.
`;

        const userPrompt = `${systemPrompt}

Client: ${business_name || 'Nouveau client'}
Type d'activité: ${business_type}
Produit choisi: ${product_type}
Volume estimé: ${volume_estimate}
Style de marque: ${brand_style}
Texte sur l'emballage: "${text_on_bag}"
${usage_details ? `Détails d'usage: ${usage_details}` : ''}
${competitor_inspiration ? `Inspiration: ${competitor_inspiration}` : ''}

Génère un conseil technique et marketing expert en français.`;

        // 2. Generate Image Prompt
        const imagePromptPrefix = "A premium paper shopping bag, studio lighting, high resolution, professional product photography";
        const styleColors: Record<string, string> = {
            "minimaliste": "white and black color scheme, clean monochrome",
            "luxe": "elegant black with gold foil accents, premium dark finish",
            "fun": "bright colorful design, vibrant orange and teal accents",
            "eco": "natural brown kraft paper, recycled texture, earth tone colors"
        };

        const promptStyle = styleColors[brand_style] || "natural brown kraft";
        const imagePrompt = `${imagePromptPrefix}, ${product_type.replace('_', ' ')}, ${promptStyle}, with elegant text '${text_on_bag}' printed on front, product mockup, white studio background, 4K quality`;

        // 3. Execute Calls in Parallel (Gemini for Text, OpenAI for Image)
        const [adviceResponse, imageResponse] = await Promise.all([
            geminiModel.generateContent(userPrompt),
            openai.images.generate({
                model: "dall-e-3",
                prompt: imagePrompt,
                n: 1,
                size: "1024x1024",
                response_format: "b64_json",
            })
        ]);

        const strategicAdvice = adviceResponse.response.text();
        const imageB64 = imageResponse.data[0].b64_json;

        // 4. Upload Image to Supabase Storage
        let imageUrl = null;
        let leadScore = "petit_profil";
        if (['10k-50k', '50k+'].includes(volume_estimate)) {
            leadScore = "gros_profil";
        }

        if (imageB64) {
            const fileName = `design_${crypto.randomUUID()}.png`;
            const binary = Uint8Array.from(atob(imageB64), c => c.charCodeAt(0));

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('uploads')
                .upload(`generated/${fileName}`, binary, {
                    contentType: 'image/png',
                    upsert: false
                });

            if (!uploadError) {
                const { data: { publicUrl } } = supabase
                    .storage
                    .from('uploads')
                    .getPublicUrl(`generated/${fileName}`);
                imageUrl = publicUrl;
            }
        }

        // 5. Save to Database
        const { data: dbData, error: dbError } = await supabase
            .from('ai_designs')
            .insert({
                business_type,
                product_type,
                volume_estimate,
                brand_style,
                text_on_bag,
                business_name,
                prompt_generated: imagePrompt,
                strategic_advice: strategicAdvice,
                image_url: imageUrl,
                lead_score: leadScore
            })
            .select()
            .single();

        if (dbError) throw dbError;

        return new Response(
            JSON.stringify({
                design_id: dbData.id,
                strategic_advice: strategicAdvice,
                image_url: imageUrl,
                lead_info: leadScore === 'gros_profil' ? "Client à fort potentiel (Gros Volume)" : "Client standard"
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: error.message || 'Error processing request' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
    }
});
