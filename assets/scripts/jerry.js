const jerrystuff = document.getElementById('jerrystuff')
const jerrysaylist = ['Hello there my friend','This is my official account :D']
function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
}
jerrystuff.innerHTML = jerrysaylist[getRndInteger(0, jerrysaylist.length)]