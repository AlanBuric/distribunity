export function findFirstLeafInTree(tree, getNodes) {
  for (const node of tree) {
    if (!getNodes(node)) {
      return node
    }

    const leaf = findFirstLeafInTree(getNodes(node), getNodes)

    if (leaf) {
      return leaf
    }
  }

  return null
}
