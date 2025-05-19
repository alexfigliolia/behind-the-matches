import { useClassNames } from "@figliolia/classnames";
import { Button } from "Components/Button";
import { LoadingText } from "Components/LoadingText";
import { ModalFooter, ModalFooterProps } from "Components/ModalFooter";
import { Alert } from "Icons/Alert";
import { Check } from "Icons/Check";
import { Callback } from "Types/Generics";
import "./styles.scss";

export const ModalFormFooter = ({
  actions,
  loading,
  success,
  error,
  showStatus,
  resetState,
  loadingText,
  successText,
  className,
  onClose,
}: Props) => {
  const classes = useClassNames("status-footer", className, {
    success,
    error: !!error,
    showStatus: !!showStatus,
  });
  return (
    <ModalFooter className={classes} actions={actions}>
      <div className="status">
        <div>
          <LoadingText
            aria-hidden={!loading}
            role={loading ? "alert" : undefined}
            aria-live="polite">
            {loadingText ?? "Loading"}
          </LoadingText>
          <div className="error-text" aria-hidden={!error}>
            <p role={!!error ? "alert" : undefined}>
              <Alert aria-hidden />
              {typeof error === "string"
                ? error
                : "Something went wrong. Please try again"}
            </p>
            <Button
              type="button"
              text="Try Again"
              onClick={resetState}
              disabled={!error}
            />
          </div>
          <div className="success-text" aria-hidden={!success}>
            <p role={success ? "alert" : undefined} aria-live="polite">
              <Check aria-hidden />
              {successText ?? "Success"}
            </p>
            <Button
              type="button"
              text="Close"
              onClick={onClose}
              disabled={!success}
            />
          </div>
        </div>
      </div>
    </ModalFooter>
  );
};

export interface Props extends Omit<ModalFooterProps, "children"> {
  loading: boolean;
  success: boolean;
  error: boolean | string;
  loadingText?: string;
  successText?: string;
  resetState: Callback;
  onClose: Callback;
  className?: string;
  showStatus: boolean;
}
