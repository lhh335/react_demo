import moduleRouter from './moduleRouter.json';
import { InstRouter } from './InstRouter';
import { SysRouter } from './SysRouter';


export const AccessRouter = (module_key) => {

  const pathRouter = module_key.split('_')[0];
  
  switch(moduleRouter[pathRouter]) {
    case 'inst': 
      return InstRouter(module_key);
    case 'system': 
      return SysRouter(module_key);
    default: return null;
  }
}