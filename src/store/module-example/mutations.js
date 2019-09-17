export function changeLoginStatus(state, status) {
  state.isLogin = status;
}
export function modifyTitle(state, title) {
  state.title = title;
}
export function addSong(state, n) {
  state.playlist.forEach((item, i) => {
    if (item.id === n.id) {
      state.playlist.splice(i, 1);
    }
  });
  state.playlist.unshift(n);
}
