export namespace DemoModel {
    export interface Demo {
        header: Header;
        script: Script;
        demoStream: Packet.BasePacket[];
    }

    export interface Header {
        magic: string;
        version: number;
        headerSize: number;
        versionString: string;
        gameId: string;
        startTime: Date;
        scriptSize: number;
        demoStreamSize: number,
        gameTime: number,
        wallclockTime: number,
        numPlayers: number,
        playerStatSize: number,
        playerStatElemSize: number,
        numTeams: number,
        teamStatSize: number,
        teamStatElemSize: number,
        teamStatPeriod: number,
        winningAllyTeamsSize: number
    }

    export interface Script {
        gameSettings: ScriptGameSettings;
        modSettings: ScriptModSettings;
        mapSettings: ScriptMapSettings;
        restrictions: ScriptRestrictions;
        allyTeams: ScriptAllyTeam[];
        spectators: ScriptPlayer[];
    }

    export interface ScriptGameSettings {
        [key: string]: string | number | boolean;
        autohostrank: number;
        numplayers: number;
        gametype: string;
        autohostport: number;
        hostip: string;
        ishost: boolean;
        mapname: string;
        startpostype: number;
        numrestrictions: number;
        autohostaccountid: number;
        autohostname: string;
        autohostcountrycode: string;
        hostport: number;
        numallyteams: number;
        hosttype: string;
        numteams: number;
    }

    export interface ScriptModSettings {
        [key: string]: string | number | boolean;
    }

    export interface ScriptMapSettings {
        [key: string]: string;
    }

    export interface ScriptRestrictions {
        [key: string]: string;
    }

    export interface ScriptAllyTeam {
        id: number;
        numallies: number;
        startrectbottom: number;
        startrectleft: number;
        startrecttop: number;
        startrectright: number;
        teams: ScriptTeam[];
    }

    export interface ScriptTeam {
        id: number;
        teamleader: number;
        rgbcolor: number[];
        allyteam: number;
        handicap: number;
        side: string;
        players: ScriptPlayer[];
    }

    export interface ScriptPlayer {
        id: number;
        skillclass: number;
        accountid: number;
        name: string;
        countrycode: string;
        skilluncertainty: number;
        rank: number;
        skill: string;
        team?: number;
    }

    // https://github.com/spring/spring/blob/develop/rts/Net/Protocol/NetMessageTypes.h
    export namespace Packet {
        export enum ID {
            KEYFRAME            = 1,
            NEWFRAME            = 2,
            QUIT                = 3,
            STARTPLAYING        = 4,
            SETPLAYERNUM        = 5,
            PLAYERNAME          = 6,
            CHAT                = 7,
            RANDSEED            = 8,
            GAMEID              = 9,
            PATH_CHECKSUM       = 10,
            COMMAND             = 11,
            SELECT              = 12,
            PAUSE               = 13,
            AICOMMAND           = 14,
            AICOMMANDS          = 15,
            AISHARE             = 16,
            USER_SPEED          = 19,
            INTERNAL_SPEED      = 20,
            CPU_USAGE           = 21,
            DIRECT_CONTROL      = 22,
            DC_UPDATE           = 23,
            SHARE               = 26,
            SETSHARE            = 27,
            PLAYERSTAT          = 29,
            GAMEOVER            = 30,
            MAPDRAW             = 31,
            SYNCRESPONSE        = 33,
            SYSTEMMSG           = 35,
            STARTPOS            = 36,
            PLAYERINFO          = 38,
            PLAYERLEFT          = 39,
            SD_CHKREQUEST       = 41,
            SD_CHKRESPONSE      = 42,
            SD_BLKREQUEST       = 43,
            SD_BLKRESPONSE      = 44,
            SD_RESET            = 45,
            LOGMSG              = 49,
            LUAMSG              = 50,
            TEAM                = 51,
            GAMEDATA            = 52,
            ALLIANCE            = 53,
            CCOMMAND            = 54,
            TEAMSTAT            = 60,
            CLIENTDATA          = 61,
            ATTEMPTCONNECT      = 65,
            REJECT_CONNECT      = 66,
            AI_CREATED          = 70,
            AI_STATE_CHANGED    = 71,
            REQUEST_TEAMSTAT    = 72,
            CREATE_NEWPLAYER    = 75,
            AICOMMAND_TRACKED   = 76,
            GAME_FRAME_PROGRESS = 77,
            PING                = 78,
        }
        export interface BasePacket {
            packetType: [ID, string];
            gameTime: number;
            playerNum?: number;
        }

        export interface KEYFRAME extends BasePacket {
            frameNum: number;
        }
        export interface NEWFRAME extends BasePacket {
        }
        export interface QUIT extends BasePacket {
            reason: string;
        }
        export interface STARTPLAYING extends BasePacket {
            countdown: number;
        }
        export interface SETPLAYERNUM extends BasePacket {
            playerNum: number;
        }
        export interface PLAYERNAME extends BasePacket {
            playerNum: number;
            playerName: string;
        }
        export interface CHAT extends BasePacket {
            fromId: number;
            toId: number;
            message: string;
        }
        export interface RANDSEED extends BasePacket {
            randSeed: number;
        }
        export interface GAMEID extends BasePacket {
            gameId: string;
        }
        export interface PATH_CHECKSUM extends BasePacket {
            playerNum: number;
            checksum: string;
        }
        export interface COMMAND extends BasePacket {
            playerNum: number;
            //commandId: number;
            timeout: number;
            //options: number;
            //params: number[];
            command: Command.BaseCommand;
        }
        export interface SELECT extends BasePacket {
            playerNum: number;
            selectedUnitIds: number[];
        }
        export interface PAUSE extends BasePacket {
            playerNum: number;
            paused: boolean;
        }
        export interface AICOMMAND extends BasePacket {
            playerNum: number;
            aiId: number;
            aiTeamId: number;
            unitId: number;
            commandId: number;
            timeout: number;
            options: number;
            params: number[];
        }
        export interface AICOMMANDS extends BasePacket {
            playerNum: number;
            aiId: number;
            pairwise: number;
            refCmdId: number;
            refCmdOpts: number;
            refCmdSize: number;
            unitIds: number[];
            commands: Array<Command.BaseCommand>;
        }
        export interface AISHARE extends BasePacket {
            playerNum: number;
            aiId: number;
            sourceTeam: number;
            destTeam: number;
            metal: number;
            energy: number;
            unitIds: number[];
        }
        export interface USER_SPEED extends BasePacket {
            playerNum: number;
            userSpeed: number;
        }
        export interface INTERNAL_SPEED extends BasePacket {
            internalSpeed: number;
        }
        export interface CPU_USAGE extends BasePacket {
            cpuUsage: number;
        }
        export interface DIRECT_CONTROL extends BasePacket {
            playerNum: number;
        }
        export interface DC_UPDATE extends BasePacket {
            playerNum: number;
            status: number;
            heading: number;
            pitch: number;
        }
        export interface SHARE extends BasePacket {
            playerNum: number;
            shareTeam: number;
            shareUnits: boolean;
            shareMetal: number;
            shareEnergy: number;
        }
        export interface SETSHARE extends BasePacket {
            playerNum: number;
            myTeam: number;
            metalShareFraction: number;
            energyShareFraction: number;
        }
        export interface PLAYERSTAT extends BasePacket {
            playerNum: number;
            numCommands: number;
            unitCommands: number;
            mousePixels: number;
            mouseClicks: number;
            keyPresses: number;
        }
        export interface GAMEOVER extends BasePacket {
            playerNum: number;
            winningAllyTeams: number[];
        }
        export interface MAPDRAW extends BasePacket {
            playerNum: number;
            mapDrawAction: MapDrawAction;
            x: number;
            z: number;
            x2?: number;
            z2?: number;
            label?: string;
        }
        export interface SYNCRESPONSE extends BasePacket {
            playerNum: number;
            frameNum: number;
            checksum: string;
        }
        export interface SYSTEMMSG extends BasePacket {
            playerNum: number;
            message: string;
        }
        export interface STARTPOS extends BasePacket {
            playerNum: number;
            myTeam: number;
            readyState: ReadyState;
            x: number;
            y: number;
            z: number;
        }
        export interface PLAYERINFO extends BasePacket {
            playerNum: number;
            cpuUsage: number;
            ping: number;
        }
        export interface PLAYERLEFT extends BasePacket {
            playerNum: number;
            reason: LeaveReason;
        }
        export interface SD_CHKREQUEST extends BasePacket {
        }
        export interface SD_CHKRESPONSE extends BasePacket {
        }
        export interface SD_BLKREQUEST extends BasePacket {
        }
        export interface SD_BLKRESPONSE extends BasePacket {
        }
        export interface SD_RESET extends BasePacket {
        }
        export interface LOGMSG extends BasePacket {
            playerNum: number;
            logMsgLvl: number;
            strData: string;
        }
        export interface LUAMSG extends BasePacket {
            playerNum: number;
            script: number;
            mode: number;
            data: any;
        }
        export interface TEAM extends BasePacket {
            playerNum: number;
            action: TeamAction;
            param: number;
        }
        export interface GAMEDATA extends BasePacket {
            setup: Script;
            mapChecksum: string;
            modChecksum: string;
            randomSeed: number;
        }
        export interface ALLIANCE extends BasePacket {
            playerNum: number;
            otherAllyTeam: number;
            areAllies: boolean;
        }
        export interface CCOMMAND extends BasePacket {
            playerNum: number;
            command: string;
            extra: string;
        }
        export interface TEAMSTAT extends BasePacket {
            teamNum: number;
            statistics: any;
        }
        export interface CLIENTDATA extends BasePacket {
            setupText: string;
        }
        export interface ATTEMPTCONNECT extends BasePacket {
            netVersion: number;
            playerName: string;
            password: string;
            versionStringDetailed: string;
        }
        export interface REJECT_CONNECT extends BasePacket {
            reason: string;
        }
        export interface AI_CREATED extends BasePacket {
            playerNum: number;
            whichSkirmishAi: number;
            team: number;
            name: string;
        }
        export interface AI_STATE_CHANGED extends BasePacket {
            playerNum: number;
            whichSkirmishAi: number;
            newState: number;
        }
        export interface REQUEST_TEAMSTAT extends BasePacket {
            teamNum: number;
            startFrameNum: number;
        }
        export interface CREATE_NEWPLAYER extends BasePacket {
            playerNum: number;
            spectator: boolean;
            teamNum: number;
            playerName: string;
        }
        export interface AICOMMAND_TRACKED extends BasePacket {
            playerNum: number;
            aiId: number;
            unitId: number;
            id: number;
            options: number;
            aiCommandId: number;
            params: number[];
        }
        export interface GAME_FRAME_PROGRESS extends BasePacket {
            frameNum: number;
        }
        export interface PING extends BasePacket {
            playerNum: number;
            pingTag: number;
            localTime: number;
        }

        export enum LeaveReason {
            LOST_CONNECTION = 0,
            INTENTIONAL = 1,
            KICKED = 2
        }

        export enum ReadyState {
            NOT_READY = 0,
            READY = 1,
            NO_UPDATE = 2
        }

        export enum TeamAction {
            GIVEAWAY = 1,
            RESIGN = 2,
            JOIN_TEAM = 3,
            TEAM_DIED = 4,
            AI_CREATED = 5,
            AI_DESTROYED = 6
        }

        export enum MapDrawAction {
            POINT,
            ERASE,
            LINE
        }
    }

    export namespace Command {
        export namespace Type {

            // export type Any = Partial<Empty & Mode & Pos & Radius & UnitID & Front & UnitFeatureOrArea & UnitOrRectangle & Number>;

            // export interface Empty {
            // }

            // export interface Values {
            //     rawValues: number[];
            // }
            // export interface Mode {
            //     mode: number;
            // }

            // export interface Pos {
            //     x: number;
            //     y: number;
            //     z: number;
            // }

            // export interface Radius {
            //     radius: number;
            // }

            // export interface UnitID {
            //     unitId: number;
            // }

            // export interface Front {
            //     camTracePos: Pos;
            //     camTraceDir?: Pos;
            // }

            // export interface UnitFeatureOrArea {
            //     unitId?: number;
            //     maxUnits?: number;
            //     area: Pos & Radius;
            // }
            // export interface UnitOrRectangle {
            //     unitId?: number;
            //     mapPos?: Pos;
            //     startPos?: Pos;
            //     endPos?: Pos;
            // }

            // export interface Number {
            //     number: number;
            // }
        }

        // https://github.com/spring/spring/blob/develop/rts/Sim/Units/CommandAI/Command.h
        export enum ID {
            STOP = 0,
            INSERT = 1,
            REMOVE = 2,
            WAIT = 5,
            TIMEWAIT = 6,
            DEATHWAIT = 7,
            SQUADWAIT = 8,
            GATHERWAIT = 9,
            MOVE = 10,
            PATROL = 15,
            FIGHT = 16,
            ATTACK = 20,
            AREA_ATTACK = 21,
            GUARD = 25,
            AISELECT = 30,
            GROUPSELECT = 35,
            GROUPADD = 36,
            GROUPCLEAR = 37,
            REPAIR = 40,
            FIRE_STATE = 45,
            MOVE_STATE = 50,
            SETBASE = 55,
            INTERNAL = 60,
            SELFD = 65,
            LOAD_UNITS = 75,
            LOAD_ONTO = 76,
            UNLOAD_UNITS = 80,
            UNLOAD_UNIT = 81,
            ONOFF = 85,
            RECLAIM = 90,
            CLOAK = 95,
            STOCKPILE = 100,
            MANUALFIRE = 105,
            RESTORE = 110,
            REPEAT = 115,
            TRAJECTORY = 120,
            RESURRECT = 125,
            CAPTURE = 130,
            AUTOREPAIRLEVEL = 135,
            IDLEMODE = 145,
            FAILED = 150,
        }
        export interface Options {
            META_KEY: boolean;
            INTERNAL_ORDER: boolean;
            RIGHT_MOUSE_KEY: boolean;
            SHIFT_KEY: boolean;
            CONTROL_KEY: boolean;
            ALT_KEY: boolean;
        }

        export interface BaseCommand {
            id: [ID, string];
            options: Options;
            rawData: number[];
            //data: DataType;
        }

        // https://github.com/spring/spring/blob/develop/rts/Sim/Units/CommandAI/CommandAI.cpp

        // export interface Stop            extends BaseCommand<Type.Empty>{}
        // export interface Insert          extends BaseCommand<Type.Empty>{}
        // export interface Remove          extends BaseCommand<Type.Empty>{}
        // export interface Wait            extends BaseCommand<Type.Empty>{}
        // export interface Timewait        extends BaseCommand<Type.Empty>{}
        // export interface Deathwait       extends BaseCommand<Type.Empty>{}
        // export interface Squadwait       extends BaseCommand<Type.Empty>{}
        // export interface Gatherwait      extends BaseCommand<Type.Empty>{}
        // export interface Move            extends BaseCommand<Type.Empty>{}
        // export interface Patrol          extends BaseCommand<Type.Empty>{}
        // export interface Fight           extends BaseCommand<Type.Empty>{}
        // export interface Attack          extends BaseCommand<Type.Empty>{}
        // export interface AreaAttack      extends BaseCommand<Type.Empty>{}
        // export interface Guard           extends BaseCommand<Type.Empty>{}
        // export interface Aiselect        extends BaseCommand<Type.Empty>{}
        // export interface Groupselect     extends BaseCommand<Type.Empty>{}
        // export interface Groupadd        extends BaseCommand<Type.Empty>{}
        // export interface Groupclear      extends BaseCommand<Type.Empty>{}
        // export interface Repair          extends BaseCommand<Type.Empty>{}
        // export interface FireState       extends BaseCommand<Type.Empty>{}
        // export interface MoveState       extends BaseCommand<Type.Empty>{}
        // export interface Setbase         extends BaseCommand<Type.Empty>{}
        // export interface Internal        extends BaseCommand<Type.Empty>{}
        // export interface Selfd           extends BaseCommand<Type.Empty>{}
        // export interface LoaUnits        extends BaseCommand<Type.Empty>{}
        // export interface LoadOnto        extends BaseCommand<Type.Empty>{}
        // export interface UnloadUnits     extends BaseCommand<Type.Empty>{}
        // export interface UnloadUnit      extends BaseCommand<Type.Empty>{}
        // export interface Onoff           extends BaseCommand<Type.Empty>{}
        // export interface Reclaim         extends BaseCommand<Type.Empty>{}
        // export interface Cloak           extends BaseCommand<Type.Empty>{}
        // export interface Stockpile       extends BaseCommand<Type.Empty>{}
        // export interface Manualfire      extends BaseCommand<Type.Empty>{}
        // export interface Restore         extends BaseCommand<Type.Empty>{}
        // export interface Repeat          extends BaseCommand<Type.Empty>{}
        // export interface Trajectory      extends BaseCommand<Type.Empty>{}
        // export interface Resurrect       extends BaseCommand<Type.Empty>{}
        // export interface Capture         extends BaseCommand<Type.Empty>{}
        // export interface Autorepairlevel extends BaseCommand<Type.Empty>{}
        // export interface Idlemode        extends BaseCommand<Type.Empty>{}
        // export interface Failed          extends BaseCommand<Type.Empty>{}
    }
}