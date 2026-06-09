import { Component, ReactNode } from 'react';
import { getTranslation, Lang } from '../../i18n';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function readLang(): Lang {
  try {
    const stored = localStorage.getItem('scattolini-lang');
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    /* ignore */
  }
  return 'es';
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const lang = readLang();

      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6 px-6 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-4xl">⚠️</div>
          <div>
            <h2 className="text-2xl text-navy">{getTranslation('errorBoundary.title', lang)}</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              {this.state.error?.message ?? getTranslation('errorBoundary.description', lang)}
            </p>
          </div>
          <button type="button" onClick={this.handleReset} className="button-primary">
            {getTranslation('errorBoundary.retry', lang)}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
