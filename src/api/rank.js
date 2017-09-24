/**
 * Created by libo on 2017/8/12.
 */
import jsonp from 'common/js/jsonp'
import {commonParams,options,options1} from './config'
import axios from 'axios'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data  = Object.assign({},commonParams,{
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url,data,options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
   const data = Object.assign({},commonParams,{
     topid,
     needNewCode: 1,
     uin: 0,
     tpl: 3,
     page: 'detail',
     type: 'top',
     platform: 'h5'
   })
   return jsonp(url,data,options)
}
