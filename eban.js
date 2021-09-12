const path = './plugins/Eban/banlist.json';
if (!file.exists(path)) {
  file.writeTo(path, '[]');
}

mc.regPlayerCmd("eban", "client id ban", function(pl, args) {
    let ply = mc.getPlayer(args[0])
    if (ply == null) {
        pl.tell('[EBan] ' + Format.Red + 'Unable to get player!')
    } else if(ply.isOP()){
        pl.tell('[EBan] ' + Format.Red + 'Failed to ban Opetator')
    }else{
        pl.tell('[EBan] ' + Format.Green + 'Success!')
        id = ply.getDevice().clientId
        ply.kick(Format.White + 'U have been banned')

        let confParsed = JSON.parse(file.readFrom(path));
        confParsed.push({
        "Nick": ply.realName,
        "ID": id
        });
        file.writeTo(path, JSON.stringify(confParsed));
    }
}, 1);

mc.regConsoleCmd("ban","ban player",function(args){
    let ply = mc.getPlayer(args[0])
    if (ply == null) {
        log('[EBan] ' + 'Unable to get player!')
    }else{
        log('[EBan] ' + 'Success!')
        id = ply.getDevice().clientId
        ply.kick(Format.White + 'U have been banned')

        let confParsed = JSON.parse(file.readFrom(path));
        confParsed.push({
        "Nick": ply.realName,
        "ID": id
        });
        file.writeTo(path, JSON.stringify(confParsed));
    }
});



mc.listen("onJoin", function(pl) {
    let banlist = JSON.parse(file.readFrom(path));
  for (let i = 0; i < banlist.length; i++) {
    if ((pl.getDevice().clientId === banlist[i]['ID'])) {
        pl.kick(Format.Red + 'U have been banned')
      }
  } 
});