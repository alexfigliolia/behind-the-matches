"use client";
import {
  Children,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
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
  {
    className,
    children,
    controls = true,
    autoplay = false,
    "aria-label": ariaLabel,
  }: Props,
  ref: ForwardedRef<ISlider>,
) {
  const ariaID = useId();
  const current = useRef(0);
  const enqueueAutoPlay = useRef(false);
  const container = useRef<HTMLDivElement>(null);
  const classes = useClassNames("slider", className);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSlides = useMemo(() => Children.count(children), [children]);

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
    const { clientWidth } = container.current;
    if (current.current === totalSlides - 1) {
      container.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.current.scrollTo({
        left: (current.current + 1) * clientWidth,
        behavior: "smooth",
      });
    }
  }, [totalSlides]);

  const next = useCallback(() => {
    slideNext();
    clearTimer();
    enqueueAutoPlay.current = true;
  }, [slideNext, clearTimer]);

  const previous = useCallback(() => {
    if (!container.current) {
      return;
    }
    const { clientWidth } = container.current;
    if (current.current === 0) {
      container.current.scrollTo({
        left: clientWidth * totalSlides - 1,
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
  }, [clearTimer, totalSlides]);

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
    current.current = Math.round((scrollLeft * totalSlides) / scrollWidth);
    if (enqueueAutoPlay.current) {
      enqueueAutoPlay.current = false;
      startAutoplay();
    }
  }, [startAutoplay, totalSlides]);

  const onScrollEnd = useDebounce(onScroll, 100);

  useEffect(() => {
    if (!autoplay || interval.current) {
      return;
    }
    startAutoplay();
    return () => clearTimer();
  }, [autoplay, startAutoplay, clearTimer]);

  return (
    <div
      role="region"
      className={classes}
      aria-label={ariaLabel}
      aria-roledescription="carousel">
      <div
        id={ariaID}
        tabIndex={0}
        className="scroll-view"
        onScroll={onScrollEnd}
        ref={container}
        aria-live={autoplay ? "off" : "polite"}>
        {Children.map(children, (child, i) => (
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${totalSlides}`}>
            {child}
          </div>
        ))}
      </div>
      {controls && (
        <div className="controls">
          <button
            aria-label="previous slide"
            onClick={previous}
            aria-controls={ariaID}>
            <ChevronLeft aria-hidden />
          </button>
          <button aria-label="next slide" onClick={next} aria-controls={ariaID}>
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
  "aria-label": string;
}

interface ISlider {
  next: Callback;
  previous: Callback;
}
