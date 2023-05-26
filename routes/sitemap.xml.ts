import { SitemapContext } from 'seo';

import manifest from '@/fresh.gen.ts';

export const handler = {
    
    GET(_request,_context){
        
        const sitemap = new SitemapContext(
            'https://jpt.ma',
            manifest
        );
             const removeListe =[ 'send',
             
             'connect',
             'logout','ai','create_room','auth/github','auth/google']
removeListe.forEach((param)=>sitemap.remove('/api/'+param))
sitemap.remove('/test')
        return sitemap.render();
    }
}
