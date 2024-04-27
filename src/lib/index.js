import { clientName, ecommerce } from '@/config'

export const tWithVars = (node, t) => {
  let tNode = t(node)
  tNode = tNode.replace(/{{ecommerce}}/g, ecommerce.name)
  tNode = tNode.replace(/{{clientName}}/g, clientName)
  return tNode
}
