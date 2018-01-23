var Utils = (function() {
  return {
    getBST: function(stats) {
      var statValues = Object.values(stats);
      return statValues.reduce((a,b) => a+b);
    },
    
    getHexColor: function(stat) {
      var result, difference;
      if (stat <= 50)
        return "ff0000";
      var statNum = parseInt(stat, 10);
      // just a whole bunch of hard-coded approximations and actual values
      switch (statNum) {
        case 144:   return "20ff11"; //actual
        case 145:   return "1aff15"; //actual
        case 146:   return "1aff17";
        case 147:   return "10ff1d"; //actual
        case 148:   return "02ff22";
        case 149:   return "02ff27";
        case 150:   return "02ff2a"; //actual
        case 151:   return "02ff2f";
        case 152:   return "02ff33";
        case 153:   return "02ff37";
        case 154:   return "02ff3b"; //actual
        case 155:   return "02ff3f"; //actual
        case 156:   return "02ff40";
        case 157:   return "02ff42";
        case 158:   return "02ff45";
        case 159:   return "02ff50"; //actual
        case 160:   return "02ff55"; //actual
        case 161:   return "02ff59";
        case 162:   return "02ff5d";
        case 163:   return "02ff62";
        case 164:   return "02ff66"; //actual
        case 165:   return "02ff6a"; //actual
        case 166:   return "02ff6f";
        case 167:   return "02ff74";
        case 168:   return "02ff77";
        case 169:   return "02ff7b";
        case 170:   return "02ff7f"; //actual
        case 171:   return "02ff83";
        case 172:   return "02ff87";
        case 173:   return "02ff8b";
        case 174:   return "02ff90";
        case 175:   return "02ff94"; //actual
        case 176:   return "02ff98";
        case 177:   return "02ff9c";
        case 178:   return "02ffa0";
        case 179:   return "02ffa5";
        case 180:   return "02ffaa"; //actual
        case 181:   return "02ffaf";
        case 182:   return "02ffb4";
        case 183:   return "02ffb8";
        case 184:   return "02ffbb"; //actual
        case 185:   return "02ffbf"; //actual
        case 186:   return "02ffc3";
        case 187:   return "02ffc7";
        case 188:   return "02ffca";
        case 189:   return "02ffd0";
        case 190:   return "02ffd4"; //actual
        case 191:   return "02ffd8";
        case 192:   return "02ffdb";
        case 193:   return "02ffe0";
        case 194:   return "02ffe5"; //actual
        case 195:   return "02ffea";
        case 196:   return "02fff0";
        case 197:   return "02fff4";
        case 198:   return "02fff8";
        case 199:   return "02fffb";
        default:
      }
      if (stat < 101) {
        difference = stat - 50;
        if (difference % 2 === 0) {
          result = parseInt("0xff0000", 16) + 2560 * (difference/2);
          if (stat >= 78) {
            if (stat >= 90)
              return (result+1024).toString(16);
            return (result+512).toString(16);
          } else {
            return result.toString(16);
          }
        } else {
          result = parseInt("0xff0000", 16) + 1536 * (difference/2);
          result += 1024 * (difference - (difference/2));
          if (stat >= 65) {
            if (stat >= 81)
              return (result+1024).toString(16);
            return (result+512).toString(16);
          } else {
            return result.toString(16);
          }
        }
      } else if (stat < 200) { // goes up to 143 in practice
        difference = stat - 101;
        if (stat % 2 === 0) {
          result = parseInt("0xfaff00", 16) - parseInt("0x060000", 16) * (difference/2);
          result -= parseInt("0x040000", 16) * (difference - (difference/2));
          if (stat >= 110) {
            if (stat >= 130)
              return (result - parseInt("0x040000", 16)).toString(16);
            return (result - parseInt("0x20000", 16)).toString(16);
          } else {
            return result.toString(16);
          }
        } else {
          result = parseInt("0xfaff00", 16) - parseInt("0x0a0000", 16) * (difference/2);
          if (stat >= 121)
            return (result - parseInt("0x20000", 16)).toString(16);
          return result.toString(16);
        }
      } else {
        return "02ffff";
      }
    }
  }
}()); // parentheses here = self executing function

module.exports = Utils;
