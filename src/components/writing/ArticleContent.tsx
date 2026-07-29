import { compileMDX } from 'next-mdx-remote/rsc'
import type { ComponentProps } from 'react'

import { RagArchitecture } from './RagArchitecture'
import { RagFailureModes } from './RagFailureModes'
import { RagReliabilityLoop } from './RagReliabilityLoop'
import { ShortCodeTradeoffMatrix } from './ShortCodeTradeoffMatrix'
import { UrlShortenerArchitecture } from './UrlShortenerArchitecture'

const components = {
  pre: (props: ComponentProps<'pre'>) => <pre {...props} />,
  code: (props: ComponentProps<'code'>) => <code {...props} />,
  table: ({ children, ...props }: ComponentProps<'table'>) => (
    <div className="writing-content-table">
      <table {...props}>{children}</table>
    </div>
  ),
  UrlShortenerArchitecture,
  ShortCodeTradeoffMatrix,
  RagArchitecture,
  RagFailureModes,
  RagReliabilityLoop,
}

export default async function ArticleContent({ source }: { source: string }) {
  const { content } = await compileMDX({ source, components })
  return content
}
