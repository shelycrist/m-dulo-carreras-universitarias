import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'
import '@/styles/global.css'
import { clientName, ecommerce } from '@/config'

// import { appWithTranslation } from 'next-i18next';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { i18n } from '@/lib/locale';
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { tWithVars } from '@/lib'

function getNodeText(node, t) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += t(child)
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, t, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node, t)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], t, slugify))
  }

  return sections
}

function translateMarkdown(markdown, t) {
  function translateNode(node) {
    if (typeof node === 'string') {
      return tWithVars(node, t)
    }
    return {
      ...node,
      children: node.children.map(translateNode),
    }
  }
  return markdown.map(translateNode)
}

export default function App({ Component, pageProps }) {
  const { t } = useTranslation()
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    if (!languageLoaded && i18n.isInitialized) {
      setLanguageLoaded(true);
    }
  }, [i18n.isInitialized]);

  if (!languageLoaded) return null;

  let title = pageProps.markdoc?.frontmatter.title

  const translatedMarkdoc = translateMarkdown(pageProps.markdoc.content, t)
  pageProps.markdoc.content = translatedMarkdoc

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content, t)
    : []

  return (
    <>
      <Head>
        <title>{t(title)} | {clientName} - {ecommerce.name}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <I18nextProvider i18n={i18n}>
        <Layout title={title} tableOfContents={tableOfContents}>
          <Component {...pageProps} />
        </Layout>
      </I18nextProvider>
    </>
  )
}
