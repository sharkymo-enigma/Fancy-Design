import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type RightRailContextValue = {
  content: ReactNode
  setContent: (node: ReactNode) => void
}

const RightRailContext = createContext<RightRailContextValue | null>(null)

export function RightRailProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null)
  const setContentStable = useCallback((node: ReactNode) => setContent(node), [])
  return (
    <RightRailContext.Provider value={{ content, setContent: setContentStable }}>
      {children}
    </RightRailContext.Provider>
  )
}

export function useRightRail() {
  const ctx = useContext(RightRailContext)
  if (!ctx) throw new Error('useRightRail must be used within RightRailProvider')
  return ctx
}
