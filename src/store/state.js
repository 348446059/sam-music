/**
 * Created by libo on 2017/8/5.
 */
import {playMode} from 'common/js/config'
import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache'
const state = {
   singer:{},
  playing:false,
  fullScreen:false,
  playlist:[],
  sequenceList:[],
  mode:playMode.sequence,
  currentIndex:-1,
  disc:{},
  topList:{},
  searchHistory:loadSearch(),
  playHistory:loadPlay(),
  favoriteList:loadFavorite()
}
export default state

//没有谁对不起谁，只有谁不懂得欣赏谁
//no one is indebted to others, while many people don't know how to cherish others
//生活就是条沉船，但是我们不要忘记在救生艇上歌唱
//life is shipwreck,but we must not forget to sing in the lifeboats
//如果一个女性不性感，那就感性，如果不感性，那就理性，如果不理性，那就自知之明，如果自知之明都做不到，那就只能不幸
// if a woman not sexy,she needs emotion,if she is not emotional, she needs reason,if she is not reasonable,she has to know herself,if not, she has only misfortune
//斗争越激烈，胜利越辉煌
// the greater the struggle,the more glorious the triumph.
