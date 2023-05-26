import { SitemapContext } from 'seo';
import { Handlers } from '$fresh/server.ts';
import manifest from '../fresh.gen.ts';

export const handler : Handlers = {
    
    GET(request,context){
        
        const sitemap = new SitemapContext(
            'https://jpt.ma'
            manifest
        );

        // You can add additional page here
        sitemap.add('/proomy');
        return sitemap.render();
    }
}
