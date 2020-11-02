import HexGridComponent from "../component/HexGridComponent";

let create = (sf, initial) => {
  let content = {
    fetch: function (position) {
      return this[position.id] ||= sf.create(initial.distanceTo(position))
    }
  }

  return {
    label: (position) => {
      return content.fetch(position).label()
    },
    update: (position, replacement) => {
      if (position && replacement) {
        content[position.id] = replacement
      }
    },
    content: (position) => {
      return content.fetch(position)
    }
  }
}

let result = {
  position: HexGridComponent.position,
  create: create
}

export default result