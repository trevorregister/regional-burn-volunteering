import Client from '../../api-client/src/client'
import { hosts } from './hosts'

const client = new Client(hosts.API_LOCAL_HOST)
export { client }