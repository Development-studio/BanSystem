const path = './plugins/Eban/banlist.json';

if (!file.exists(path)) {
    file.writeTo(path, '[]');
}

mc.regPlayerCmd("eban", "client id ban", function(pl, args) {
    let ply = mc.getPlayer(args[0]);
    if (ply == null) {
        pl.tell('[EBan] ' + Format.Red + 'Unable to get player!');
    } else if (ply.isOP()) {
        pl.tell('[EBan] ' + Format.Red + 'Failed to ban Opetator');
    } else {
        pl.tell('[EBan] ' + Format.Green + 'Success!');
        id = ply.getDevice().clientId;
        ply.kick(Format.White + 'U have been banned');

        let confParsed = JSON.parse(file.readFrom(path));
        confParsed.push({
            "Nick": ply.realName,
            "ID": id
        });
        file.writeTo(path, JSON.stringify(confParsed));
    }
}, 1);

mc.regConsoleCmd("eban", "ban player", function(args) {
    let ply = mc.getPlayer(args[0])
    if (ply == null) {
        log('[EBan] ' + 'Unable to get player!')
    } else {
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

mc.regPlayerCmd("unban", "unban player", function(pl, args) {
    let banlist = JSON.parse(file.readFrom(path));
    for (let i = 0; i < banlist.length; i++) {
        if (args[0] === banlist[i]['Nick']) {
            unbanObj = `{"Nick":"${banlist[i]['Nick']}","ID":"${banlist[i]['ID']}"}`;
            banlist = String(JSON.stringify(banlist));
            rewrite = banlist.replace(unbanObj, '');
            file.writeTo(path, rewrite)
            pl.tell('[EBan] ' + Format.Green + 'Success!');
        }
    }            
}, 1);

mc.regConsoleCmd("unban", "unban player", function(args) {
    if (args[0] !== undefined) {
        let banlist = JSON.parse(file.readFrom(path));
        for (let i = 0; i < banlist.length; i++) {
            if (args[0] === banlist[i]['Nick']) {
                unbanObj = `{"Nick":"${banlist[i]['Nick']}","ID":"${banlist[i]['ID']}"}`;
                banlist = String(JSON.stringify(banlist));
                rewrite = banlist.replace(unbanObj, '');
                file.writeTo(path, rewrite)
                log('[EBan] ' + 'Success!')
            }
        }
    }
});

mc.listen("onJoin", function(pl) {
    let banlist = JSON.parse(file.readFrom(path));
    for (let i = 0; i < banlist.length; i++) {
        if ((pl.getDevice().clientId === banlist[i]['ID'])) {
            pl.kick(Format.Red + 'U have been banned');
        }
    } 
});
