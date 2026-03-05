import { StrictMode, Component, ErrorInfo, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { RoleProvider } from './context/RoleContext'
import { RightRailProvider } from './context/RightRailContext'
import App from './App'
import './index.css'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App error:', error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-8 font-sans max-w-xl mx-auto">
          <h1 className="text-destructive text-xl font-semibold mt-0">Something went wrong</h1>
          <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
            {this.state.error.message}
          </pre>
          <p className="text-muted-foreground mt-4">Check the browser console for more details.</p>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <RoleProvider>
          <RightRailProvider>
            <App />
          </RightRailProvider>
        </RoleProvider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
