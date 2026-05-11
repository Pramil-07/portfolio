import { Component, ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex-center min-h-[200px] text-sm" style={{ color: "var(--c-text-3)" }}>
                    Something went wrong loading this section.
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
