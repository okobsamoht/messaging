import { Service } from '../base/service'
import { CachingService } from '../caching/service'
import { DatabaseService } from '../database/service'
import { ConvmapService } from './convmap/service'
import { IdentityService } from './identities/service'
import { SandboxmapService } from './sandboxmap/service'
import { SenderService } from './senders/service'
import { ThreadService } from './threads/service'
import { TunnelService } from './tunnels/service'
import { UsermapService } from './usermap/service'

export class MappingService extends Service {
  public tunnels: TunnelService
  public identities: IdentityService
  public senders: SenderService
  public threads: ThreadService
  public usermap: UsermapService
  public convmap: ConvmapService
  public sandboxmap: SandboxmapService

  constructor(private db: DatabaseService, private caching: CachingService) {
    super()

    this.tunnels = new TunnelService(this.db, this.caching)
    this.identities = new IdentityService(this.db, this.caching)
    this.senders = new SenderService(this.db, this.caching)
    this.threads = new ThreadService(this.db, this.caching)
    this.usermap = new UsermapService(this.db, this.caching)
    this.convmap = new ConvmapService(this.db, this.caching)
    this.sandboxmap = new SandboxmapService(this.db, this.caching)
  }

  async setup() {
    await this.tunnels.setup()
    await this.identities.setup()
    await this.senders.setup()
    await this.threads.setup()
    await this.usermap.setup()
    await this.convmap.setup()
    await this.sandboxmap.setup()
  }
}
