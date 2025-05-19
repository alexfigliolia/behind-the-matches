"use client";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useDebounce } from "Hooks/useDebounce";
import { ChevronLeft } from "Icons/ChevronLeft";
import { ChevronRight } from "Icons/ChevronRight";
import { Callback } from "Types/Generics";
import { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Slider = forwardRef(function Slider(
  { className, children, controls = true, autoplay = false }: Props,
  ref: ForwardedRef<ISlider>,
) {
  const current = useRef(0);
  const enqueueAutoPlay = useRef(false);
  const container = useRef<HTMLDivElement>(null);
  const classes = useClassNames("slider", className);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  const slideNext = useCallback(() => {
    if (!container.current) {
      return;
    }
    const { children, clientWidth } = container.current;
    const { length } = children;
    if (current.current === length - 1) {
      container.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.current.scrollTo({
        left: (current.current + 1) * clientWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const next = useCallback(() => {
    slideNext();
    clearTimer();
    enqueueAutoPlay.current = true;
  }, [slideNext, clearTimer]);

  const previous = useCallback(() => {
    if (!container.current) {
      return;
    }
    const { children, clientWidth } = container.current;
    const { length } = children;
    if (current.current === 0) {
      container.current.scrollTo({
        left: clientWidth * length,
        behavior: "smooth",
      });
    } else {
      container.current.scrollTo({
        left: (current.current - 1) * clientWidth,
        behavior: "smooth",
      });
    }
    clearTimer();
    enqueueAutoPlay.current = true;
  }, [clearTimer]);

  const startAutoplay = useCallback(() => {
    if (interval.current) {
      return;
    }
    interval.current = setInterval(() => slideNext(), 6000);
  }, [slideNext]);

  useImperativeHandle(ref, () => ({ previous, next }), [previous, next]);

  const onScroll = useCallback(() => {
    if (!container.current) {
      return;
    }
    const { scrollWidth, scrollLeft } = container.current;
    current.current = Math.round(
      (scrollLeft * container.current.children.length) / scrollWidth,
    );
    if (enqueueAutoPlay.current) {
      enqueueAutoPlay.current = false;
      startAutoplay();
    }
  }, [startAutoplay]);

  const onScrollEnd = useDebounce(onScroll, 100);

  useEffect(() => {
    if (!autoplay || interval.current) {
      return;
    }
    startAutoplay();
    return () => clearTimer();
  }, [autoplay, startAutoplay, clearTimer]);

  return (
    <div className={classes}>
      <div className="scroll-view" onScroll={onScrollEnd} ref={container}>
        {children}
      </div>
      {controls && (
        <div className="controls">
          <button aria-label="previous" onClick={previous}>
            <ChevronLeft aria-hidden />
          </button>
          <button aria-label="next" onClick={next}>
            <ChevronRight aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
});

interface Props extends OptionalChildren {
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
}

interface ISlider {
  next: Callback;
  previous: Callback;
}
