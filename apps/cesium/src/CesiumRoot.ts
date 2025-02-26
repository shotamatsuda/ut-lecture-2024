import {
  CesiumWidget,
  DataSourceCollection,
  DataSourceDisplay,
  EventHelper,
  type Clock,
  type EntityCollection
} from '@cesium/engine'

export type CesiumRootOptions = Exclude<
  ConstructorParameters<typeof CesiumWidget>[1],
  undefined
>

export class CesiumRoot extends CesiumWidget {
  readonly dataSources = new DataSourceCollection()
  readonly dataSourceDisplay = new DataSourceDisplay({
    scene: this.scene,
    dataSourceCollection: this.dataSources
  })

  private readonly eventHelper = new EventHelper()

  constructor(container: Element, options: CesiumRootOptions = {}) {
    super(container, options)
    this.eventHelper.add(this.clock.onTick, this.handleTick, this)
  }

  get entities(): EntityCollection {
    return this.dataSourceDisplay.defaultDataSource.entities
  }

  override destroy(): void {
    if (!this.isDestroyed()) {
      this.eventHelper.removeAll()
      this.dataSourceDisplay.destroy()
      this.dataSources.destroy()
      super.destroy()
    }
  }

  handleTick = (clock: Clock): void => {
    this.dataSourceDisplay.update(clock.currentTime)
  }
}
