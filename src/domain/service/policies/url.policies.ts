export class Url {

     isValidUrl(url: string, domain?: string): boolean {
            try {
                const parsed = new URL(url);
    
                if (parsed.protocol !== 'https:') return false;
                if (domain && !parsed.hostname.includes(domain)) return false;
    
                return true;
            } catch {
                return false;
            }
        }
}