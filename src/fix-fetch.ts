// Fix for protobufjs / formdata-polyfill fetch override error
// Some environments have fetch as a read-only property which causes formdata-polyfill to crash
(function() {
  try {
    const target = window as any;
    let descriptor = Object.getOwnPropertyDescriptor(target, 'fetch');
    
    if (!descriptor) {
      descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'fetch');
    }

    if (descriptor && descriptor.configurable) {
      let _fetch = window.fetch;
      Object.defineProperty(window, 'fetch', {
        get: () => _fetch,
        set: (v) => { _fetch = v; },
        configurable: true,
        enumerable: true
      });
      
      // Also try to just make it writable if possible
      try {
        Object.defineProperty(window, 'fetch', {
          value: _fetch,
          writable: true,
          configurable: true,
          enumerable: true
        });
      } catch (e) {
        // If value/writable fails, the get/set above is already in place
      }
    }
  } catch (e) {
    console.warn('Failed to patch fetch in module:', e);
  }
})();

export {};
