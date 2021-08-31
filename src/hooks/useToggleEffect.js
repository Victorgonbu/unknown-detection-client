import useDidMountEffect from './useDidMountEffect';

const useToggleEffect = (ref, activeClass, deps) => {
  useDidMountEffect(() => {
    ref.current.classList.toggle(activeClass);
  }, deps);
};

export default useToggleEffect;
