
import { routers } from '../components/Router/router.config';

class Utils {
  loadScript(url: string) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.body.appendChild(script);
  }

  extend(...args: any[]) {
    let options;
    let name;
    let src;
    let srcType;
    let copy;
    let copyIsArray;
    let clone;
    let target = args[0] || {};
    let i = 1;
    const length = args.length;
    let deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = args[i] || {};
      i++;
    }
    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      // eslint-disable-next-line no-cond-assign
      if ((options = args[i]) !== null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            // eslint-disable-next-line no-continue
            continue;
          }
          srcType = Array.isArray(src) ? 'array' : typeof src;
          if (deep && copy && ((copyIsArray = Array.isArray(copy)) || typeof copy === 'object')) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && srcType === 'array' ? src : [];
            } else {
              clone = src && srcType === 'object' ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  }

  getPageTitle = (pathname: string) => {
    const route = routers.filter(route => route.path === pathname);
    const localizedAppName = ('AppName');
    if (!route || route.length === 0) {
      return localizedAppName;
    }

    return (route[0].title) + ' | ' + localizedAppName;
  };

  getRoute = (path: string): any => {
    return routers.filter(route => route.path === path)[0];
  };
}

export default new Utils();
