import { JisonParser, JisonParserApi, StateType, SymbolsType, TerminalsType, ProductionsType } from '@ts-jison/parser';
/**
 * parser generated by  @ts-jison/parser-generator 0.4.1-alpha.2
 * @returns Parser implementing JisonParserApi and a Lexer implementing JisonLexerApi.
 */

  const Tipo = require('./simbolo/Tipo')
  const Nativo = require('./expresiones/Nativo')
  const Aritmeticas = require('./expresiones/Aritmeticas')
  const Relacionales = require('./expresiones/Relacionales')
  const AccesoVar = require('./expresiones/AccesoVar') 
  const Decremento = require('./instrucciones/Decremento') 
  const Print = require('./instrucciones/Print')
  const Declaracion = require('./instrucciones/Declaracion')
  const DeclaracionDefecto = require('./instrucciones/DeclaracionDefecto')
  const Incremento = require('./instrucciones/Incremento')
  const Casteo = require('./instrucciones/Casteo')
  const AsignacionVar = require('./instrucciones/AsignacionVar')
  const CasteoAsignacion = require('./instrucciones/CasteoAsignacion')
  const If = require('./instrucciones/If')
  const IfElse = require('./instrucciones/IfElse')
  const Elif = require('./instrucciones/Elif')
  const While = require('./instrucciones/While')
  const Break = require('./instrucciones/Break')
  const Continue = require('./instrucciones/Continue')
  const Metodo = require('./instrucciones/Metodo')
  const Llamada = require('./instrucciones/Llamada')
  const Run = require('./instrucciones/Run')
  const ObjetoMatch = require('./instrucciones/ObjetoMatch')
  const MatchDefault= require('./instrucciones/MatchDefault')
  const Match = require('./instrucciones/Match')
  const Default = require('./instrucciones/Default')
  const For = require('./instrucciones/For')
  const DoWhile = require('./instrucciones/DoWhile')
  const Loop = require('./instrucciones/Loop')
  const DeclaracionVector = require('./instrucciones/DeclaracionVector')
  const Funcion = require('./instrucciones/Funcion')
  const Return = require('./instrucciones/Return')
  const DeclaracionMatriz = require('./instrucciones/DeclaracionMatriz')
  const DeclaracionMatrizDefecto = require('./instrucciones/DeclaracionMatrizDefecto')
  const DeclararArregloDefecto = require('./instrucciones/DeclararArregloDefecto')
  const AsignacionVector = require('./instrucciones/AsignacionVector')
  const AsignacionMatriz = require('./instrucciones/AsignacionMatriz')
  const AccesoVector = require('./instrucciones/AccesoVector')
  const AccesoMatriz = require('./instrucciones/AccesoMatriz')

export class ProyectoParser extends JisonParser implements JisonParserApi {
    $?: any;
    symbols_: SymbolsType = {"error":2,"INICIO":3,"INSTRUCCIONES":4,"EOF":5,"INSTRUCCION":6,"IMPRESION":7,"PUNTOCOMA":8,"DECLARACION":9,"MULTIPLEDECLARACION":10,"ASIGNACION":11,"INCREMENTO":12,"DECREMENTO":13,"SIF":14,"SBREAK":15,"SCONTINUE":16,"SRETURN":17,"SDO":18,"SWHILE":19,"SLOOP":20,"SFOR":21,"SSWITCH":22,"METODO":23,"FUNCIONES":24,"EJECUTAR":25,"LLAMADA":26,"TKPRINT":27,"EXPRESION":28,"ID":29,"MAS":30,"MENOS":31,"MUTABILIDAD":32,"LISTAID":33,"DOSPUNTOS":34,"TIPOS":35,"IGUAL":36,"CAST":37,"PAR1":38,"AS":39,"PAR2":40,"COR1":41,"COR2":42,"NEW":43,"VECTOR":44,"LISTAMATRIZ":45,"LISTAVECTOR":46,"COMA":47,"VALORESMATRIZ":48,"SWITCH":49,"LLAVE1":50,"INSTRUCCIONESMATCH":51,"LLAVE2":52,"DEFAULT":53,"FOR":54,"ACTUALIZARFOR":55,"LOOP":56,"SENTENCIAMATCH":57,"CASE":58,"IF":59,"ELSE":60,"WHILE":61,"DO":62,"UNTIL":63,"BREAK":64,"CONTINUE":65,"RETURN":66,"FUNCTION":67,"VOID":68,"PARAMS":69,"PARAM":70,"RUN":71,"PARAMSCALL":72,"PARAMCALL":73,"MULTIPLICACION":74,"DIVISION":75,"POTENCIA":76,"RAIZ":77,"MODULO":78,"RELACIONALES":79,"ENTERO":80,"DECIMAL":81,"CADENA":82,"TRUE":83,"FALSE":84,"CHAR":85,"MENOR":86,"NEGACION":87,"MAYOR":88,"AND":89,"OR":90,"LET":91,"CONST":92,"INT":93,"DOUBLE":94,"STRING":95,"BOOL":96,"CARACTER":97,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",5:"EOF",8:"PUNTOCOMA",27:"TKPRINT",29:"ID",30:"MAS",31:"MENOS",34:"DOSPUNTOS",36:"IGUAL",37:"CAST",38:"PAR1",39:"AS",40:"PAR2",41:"COR1",42:"COR2",43:"NEW",44:"VECTOR",47:"COMA",49:"SWITCH",50:"LLAVE1",52:"LLAVE2",53:"DEFAULT",54:"FOR",56:"LOOP",58:"CASE",59:"IF",60:"ELSE",61:"WHILE",62:"DO",63:"UNTIL",64:"BREAK",65:"CONTINUE",66:"RETURN",67:"FUNCTION",68:"VOID",71:"RUN",74:"MULTIPLICACION",75:"DIVISION",76:"POTENCIA",77:"RAIZ",78:"MODULO",80:"ENTERO",81:"DECIMAL",82:"CADENA",83:"TRUE",84:"FALSE",85:"CHAR",86:"MENOR",87:"NEGACION",88:"MAYOR",89:"AND",90:"OR",91:"LET",92:"CONST",93:"INT",94:"DOUBLE",95:"STRING",96:"BOOL",97:"CARACTER"};
    productions_: ProductionsType = [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,2],[6,2],[6,2],[6,1],[6,2],[6,2],[6,2],[6,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,2],[6,2],[7,2],[12,3],[13,3],[9,6],[9,11],[9,13],[9,18],[9,12],[9,8],[45,3],[45,1],[46,3],[48,3],[48,1],[10,4],[33,3],[33,1],[11,3],[11,8],[11,6],[11,9],[22,7],[22,10],[22,9],[21,11],[21,11],[20,4],[55,3],[55,3],[55,3],[51,2],[51,1],[57,4],[14,7],[14,11],[14,9],[19,7],[18,8],[15,1],[16,1],[17,2],[23,9],[23,8],[24,9],[24,8],[69,3],[69,1],[70,5],[70,3],[25,5],[25,4],[26,4],[26,3],[72,3],[72,1],[73,3],[28,2],[28,3],[28,3],[28,3],[28,3],[28,3],[28,3],[28,3],[28,1],[28,3],[28,1],[28,1],[28,1],[28,1],[28,1],[28,1],[28,1],[28,1],[28,4],[28,7],[79,3],[79,4],[79,4],[79,4],[79,3],[79,4],[79,3],[79,3],[79,2],[32,1],[32,1],[35,1],[35,1],[35,1],[35,1],[35,1]];
    table: Array<StateType>;
    defaultActions: {[key:number]: any} = {27:[2,61],28:[2,62],37:[2,108],38:[2,109],39:[2,1],110:[2,24],111:[2,25],163:[2,73],189:[2,72],239:[2,31],242:[2,41],245:[2,60],269:[2,51],270:[2,52],288:[2,27],299:[2,30],301:[2,28],308:[2,29]};

    constructor (yy = {}, lexer = new ProyectoLexer(yy)) {
      super(yy, lexer);

      // shorten static method to just `o` for terse STATE_TABLE
      const $V0=[1,23],$V1=[1,25],$V2=[1,34],$V3=[1,33],$V4=[1,32],$V5=[1,26],$V6=[1,31],$V7=[1,30],$V8=[1,27],$V9=[1,28],$Va=[1,29],$Vb=[1,35],$Vc=[1,36],$Vd=[1,37],$Ve=[1,38],$Vf=[5,27,29,49,52,53,54,56,58,59,61,62,64,65,66,67,71,91,92],$Vg=[1,57],$Vh=[1,54],$Vi=[1,56],$Vj=[1,58],$Vk=[1,59],$Vl=[1,60],$Vm=[1,61],$Vn=[1,62],$Vo=[1,63],$Vp=[1,65],$Vq=[1,67],$Vr=[1,68],$Vs=[1,72],$Vt=[1,69],$Vu=[1,82],$Vv=[1,83],$Vw=[1,84],$Vx=[1,85],$Vy=[1,86],$Vz=[1,88],$VA=[1,89],$VB=[1,96],$VC=[1,90],$VD=[1,91],$VE=[1,92],$VF=[1,93],$VG=[1,94],$VH=[1,95],$VI=[1,97],$VJ=[1,98],$VK=[1,99],$VL=[1,100],$VM=[8,30,31,34,36,39,40,42,47,74,75,76,77,78,86,87,88,89,90],$VN=[1,106],$VO=[34,47],$VP=[1,115],$VQ=[8,29,36,40,41,47],$VR=[8,30,31,34,36,39,40,42,47,86,87,88,89,90],$VS=[8,34,39,40,42,47,89,90],$VT=[1,150],$VU=[40,47],$VV=[8,30,31,34,36,39,40,42,47,74,75,78,86,87,88,89,90],$VW=[8,34,36,39,40,42,47,86,87,88,89,90],$VX=[1,169],$VY=[1,170],$VZ=[1,186],$V_=[8,34,39,40,42,47,87,89,90],$V$=[1,206],$V01=[1,208],$V11=[1,223],$V21=[52,53,58],$V31=[1,240],$V41=[42,47];
      const o = JisonParser.expandParseTable;
      this.table = [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{1:[3]},{5:[1,39],6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($Vf,[2,3]),{8:[1,41]},{8:[1,42]},{8:[1,43]},{8:[1,44]},{8:[1,45]},{8:[1,46]},o($Vf,[2,10]),{8:[1,47]},{8:[1,48]},{8:[1,49]},{8:[1,50]},o($Vf,[2,15]),o($Vf,[2,16]),o($Vf,[2,17]),o($Vf,[2,18]),o($Vf,[2,19]),o($Vf,[2,20]),{8:[1,51]},{8:[1,52]},{26:64,28:53,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{29:$Vq,33:66},{30:[1,70],31:[1,71],36:$Vr,38:$Vs,41:$Vt},{38:[1,73]},{8:[2,61]},{8:[2,62]},{26:64,28:74,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{50:[1,75]},{38:[1,76]},{50:[1,77]},{38:[1,78]},{38:[1,79]},{35:81,68:[1,80],93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{29:[1,87]},{29:[2,108]},{29:[2,109]},{1:[2,1]},o($Vf,[2,2]),o($Vf,[2,4]),o($Vf,[2,5]),o($Vf,[2,6]),o($Vf,[2,7]),o($Vf,[2,8]),o($Vf,[2,9]),o($Vf,[2,11]),o($Vf,[2,12]),o($Vf,[2,13]),o($Vf,[2,14]),o($Vf,[2,21]),o($Vf,[2,22]),{8:[2,23],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{26:64,28:101,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($VM,[2,87]),{26:64,28:102,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($VM,[2,89],{38:$Vs,41:[1,103]}),o($VM,[2,90]),o($VM,[2,91]),o($VM,[2,92]),o($VM,[2,93]),o($VM,[2,94]),o($VM,[2,95]),o($VM,[2,96]),{26:64,28:104,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{34:[1,105],47:$VN},o($VO,[2,39]),{26:64,28:107,29:$Vg,31:$Vh,37:[1,108],38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:109,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{30:[1,110]},{31:[1,111]},{29:$VP,40:[1,113],72:112,73:114},{26:64,28:116,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{8:[2,63],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{4:117,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{26:64,28:118,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{4:119,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{9:121,11:120,29:[1,122],32:123,91:$Vd,92:$Ve},{26:64,28:124,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{29:[1,125]},{29:[1,126]},o($VQ,[2,110]),o($VQ,[2,111]),o($VQ,[2,112]),o($VQ,[2,113]),o($VQ,[2,114]),{38:[1,127]},{26:64,28:128,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:129,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:130,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:131,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:132,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:133,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:134,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:135,29:$Vg,31:$Vh,36:[1,136],38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{36:[1,137]},{36:[1,138]},{26:64,28:139,29:$Vg,31:$Vh,36:[1,140],38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:141,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:142,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($VR,[2,79],{74:$VC,75:$VD,76:$VE,77:$VF,78:$VG}),{30:$Vz,31:$VA,36:$VB,40:[1,143],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{26:64,28:144,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($VS,[2,107],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ}),{35:145,93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{29:[1,146]},{8:[2,40],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{38:[1,147]},{30:$Vz,31:$VA,36:$VB,42:[1,148],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{8:[2,24]},{8:[2,25]},{40:[1,149],47:$VT},o($VM,[2,75]),o($VU,[2,77]),{36:[1,151]},{30:$Vz,31:$VA,36:$VB,40:[1,152],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,153],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{30:$Vz,31:$VA,36:$VB,40:[1,154],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,155],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{8:[1,156]},{8:[1,157]},{36:$Vr,41:$Vt},{29:$Vq,33:158},{30:$Vz,31:$VA,36:$VB,40:[1,159],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{38:[1,160]},{38:[1,161]},{29:$VP,40:[1,163],72:162,73:114},o($VR,[2,80],{74:$VC,75:$VD,76:$VE,77:$VF,78:$VG}),o($VR,[2,81],{74:$VC,75:$VD,76:$VE,77:$VF,78:$VG}),o($VV,[2,82],{76:$VE,77:$VF}),o($VV,[2,83],{76:$VE,77:$VF}),o($VM,[2,84]),o($VM,[2,85]),o($VV,[2,86],{76:$VE,77:$VF}),o($VW,[2,99],{30:$Vz,31:$VA,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG}),{26:64,28:164,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:165,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:166,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($VW,[2,103],{30:$Vz,31:$VA,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG}),{26:64,28:167,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($VS,[2,105],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ}),o([8,34,39,40,42,47,90],[2,106],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK}),o($VM,[2,88]),{30:$Vz,31:$VA,36:$VB,42:[1,168],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{8:[2,37],36:$VX,41:$VY},o($VO,[2,38]),{26:64,28:171,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{36:[1,172],41:[1,173]},o($VM,[2,74]),{29:$VP,73:174},{26:64,28:175,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{50:[1,176]},{63:[1,177]},{50:[1,178]},o($Vf,[2,49]),{26:64,28:179,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:180,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{34:[1,181],47:$VN},{50:[1,182]},{29:$VZ,40:[1,184],69:183,70:185},{29:$VZ,40:[1,188],69:187,70:185},{40:[1,189],47:$VT},{8:[2,73]},o($VW,[2,102],{30:$Vz,31:$VA,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG}),o($V_,[2,100],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,88:$VJ}),o($V_,[2,101],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,88:$VJ}),o($VW,[2,104],{30:$Vz,31:$VA,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG}),o($VM,[2,97],{41:[1,190]}),{26:64,28:191,29:$Vg,31:$Vh,37:[1,192],38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{42:[1,193]},{30:$Vz,31:$VA,36:$VB,39:[1,194],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{26:64,28:195,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{26:64,28:196,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($VU,[2,76]),o($VU,[2,78],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL}),{4:197,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{38:[1,198]},{4:199,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{8:[1,200],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{8:[1,201],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{35:202,93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{51:203,53:[1,204],57:205,58:$V$},{40:[1,207],47:$V01},{50:[1,209]},o($VU,[2,69]),{34:[1,210]},{40:[1,211],47:$V01},{50:[1,212]},{8:[2,72]},{26:64,28:213,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{8:[2,26],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{38:[1,214]},{36:[1,215],41:[1,216]},{35:217,93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{8:[2,42],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{30:$Vz,31:$VA,36:$VB,42:[1,218],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,219],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{26:64,28:220,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,221],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{29:$V11,55:222},{29:$V11,55:224},{36:$VX,41:$VY},{52:[1,225],53:[1,226],57:227,58:$V$},{34:[1,228]},o($V21,[2,54]),{26:64,28:229,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{50:[1,230]},{29:$VZ,70:231},{4:232,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{35:233,93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{50:[1,234]},{4:235,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{30:$Vz,31:$VA,36:$VB,42:[1,236],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{26:64,28:237,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{41:$V31,43:[1,238],46:239},{42:[1,241]},{40:[1,242]},{36:[1,243]},o($Vf,[2,56],{60:[1,244]}),{30:$Vz,31:$VA,36:$VB,40:[1,245],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},o($Vf,[2,59]),{40:[1,246]},{30:[1,248],31:[1,249],36:[1,247]},{40:[1,250]},o($Vf,[2,44]),{34:[1,251]},o($V21,[2,53]),{4:252,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{30:$Vz,31:$VA,34:[1,253],36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{4:254,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($VU,[2,68]),{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,255],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($VU,[2,71],{36:[1,256]}),{4:257,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,258],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($VM,[2,98]),{30:$Vz,31:$VA,36:$VB,39:[1,259],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{44:[1,260]},{8:[2,31]},{26:64,28:262,29:$Vg,31:$Vh,38:$Vi,48:261,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{36:[1,263]},{8:[2,41]},{26:64,28:264,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{14:266,50:[1,265],59:$V5},{8:[2,60]},{50:[1,267]},{26:64,28:268,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{30:[1,269]},{31:[1,270]},{50:[1,271]},{4:272,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,273],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{4:274,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,275],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($Vf,[2,65]),{26:64,28:276,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,277],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($Vf,[2,67]),{35:278,93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{35:279,93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{42:[1,280],47:[1,281]},o($V41,[2,36],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL}),{41:[1,283],43:[1,282]},{8:[2,43],30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{4:284,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($Vf,[2,58]),{4:285,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{30:$Vz,31:$VA,36:$VB,40:[2,50],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{40:[2,51]},{40:[2,52]},{4:286,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,287],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($Vf,[2,46]),o($V21,[2,55],{7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,32:24,6:40,27:$V0,29:$V1,49:$V2,54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve}),o($Vf,[2,64]),o($VU,[2,70],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL}),o($Vf,[2,66]),{40:[1,288]},{41:[1,289]},o([8,42,47],[2,34]),{26:64,28:290,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{44:[1,291]},{41:$V31,45:292,46:293},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,294],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,295],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},{6:40,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,17:13,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:22,27:$V0,29:$V1,32:24,49:$V2,52:[1,296],54:$V3,56:$V4,59:$V5,61:$V6,62:$V7,64:$V8,65:$V9,66:$Va,67:$Vb,71:$Vc,91:$Vd,92:$Ve},o($Vf,[2,45]),{8:[2,27]},{26:64,28:297,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($V41,[2,35],{30:$Vz,31:$VA,36:$VB,74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL}),{35:298,93:$Vu,94:$Vv,95:$Vw,96:$Vx,97:$Vy},{42:[1,299],47:[1,300]},o($V41,[2,33]),o($Vf,[2,57]),o($Vf,[2,47]),o($Vf,[2,48]),{30:$Vz,31:$VA,36:$VB,42:[1,301],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{41:[1,302]},{8:[2,30]},{41:$V31,46:303},{8:[2,28]},{26:64,28:304,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},o($V41,[2,32]),{30:$Vz,31:$VA,36:$VB,42:[1,305],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{41:[1,306]},{26:64,28:307,29:$Vg,31:$Vh,38:$Vi,79:55,80:$Vj,81:$Vk,82:$Vl,83:$Vm,84:$Vn,85:$Vo,87:$Vp},{30:$Vz,31:$VA,36:$VB,42:[1,308],74:$VC,75:$VD,76:$VE,77:$VF,78:$VG,86:$VH,87:$VI,88:$VJ,89:$VK,90:$VL},{8:[2,29]}];
    }

    performAction (yytext:string, yyleng:number, yylineno:number, yy:any, yystate:number /* action[1] */, $$:any /* vstack */, _$:any /* lstack */): any {
/* this == yyval */
          var $0 = $$.length - 1;
        switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2: case 53:
$$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 3: case 33: case 36: case 39: case 54: case 69: case 77:
this.$ = [$$[$0]];
break;
case 4: case 5: case 6: case 7: case 8: case 9: case 11: case 12: case 13: case 14: case 21: case 22: case 34: case 88:
this.$ = $$[$0-1];
break;
case 10: case 15: case 16: case 17: case 18: case 19: case 20:
this.$ = $$[$0];
break;
case 23:
this.$ = new Print.default($$[$0], _$[$0-1].first_line, _$[$0-1].first_column)
break;
case 24: case 51:
this.$ = new Incremento.default($$[$0-2], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 25: case 52:
this.$ = new Decremento.default($$[$0-2], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 26:
this.$ = new Declaracion.default($$[$0-2], _$[$0-5].first_line, _$[$0-5].first_column, $$[$0-4][0], $$[$0],$$[$0-5]);
break;
case 27:
this.$ = new Casteo.default($$[$0-7], $$[$0-1],_$[$0-10].first_line, _$[$0-10].first_column, $$[$0-9][0], $$[$0-3],$$[$0-10]);
break;
case 28:
this.$ = new DeclaracionVector.default($$[$0-9],_$[$0-12].first_line, _$[$0-12].first_column,$$[$0-12],$$[$0-11][0], $$[$0-3],$$[$0-1]);
break;
case 29:
this.$ = new DeclaracionMatriz.default($$[$0-14],_$[$0-17].first_line, _$[$0-17].first_column,$$[$0-17],$$[$0-16][0], $$[$0-6],$$[$0-4],$$[$0-1]);
break;
case 30:
 this.$ = new DeclaracionMatrizDefecto.default($$[$0-8],_$[$0-11].first_line, _$[$0-11].first_column,$$[$0-11],$$[$0-10][0],$$[$0-1]); 
break;
case 31:
 this.$ = new DeclararArregloDefecto.default($$[$0-4],_$[$0-7].first_line, _$[$0-7].first_column,$$[$0-7],$$[$0-6][0],$$[$0]); 
break;
case 32: case 35: case 38: case 68: case 76:
$$[$0-2].push($$[$0]); this.$ = $$[$0-2];
break;
case 37:
this.$ = new DeclaracionDefecto.default($$[$0], _$[$0-3].first_line, _$[$0-3].first_column, $$[$0-2],$$[$0-3]);
break;
case 40: case 50:
this.$ = new AsignacionVar.default($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column );
break;
case 41:
this.$ = new CasteoAsignacion.default($$[$0-7], $$[$0-1],$$[$0-3], _$[$0-7].first_line, _$[$0-7].first_column );
break;
case 42:
this.$ = new AsignacionVector.default($$[$0-5], $$[$0-3],$$[$0], _$[$0-5].first_line, _$[$0-5].first_column );
break;
case 43:
this.$ = new AsignacionMatriz.default($$[$0-8], $$[$0-6],$$[$0-3], $$[$0], _$[$0-8].first_line, _$[$0-8].first_column );
break;
case 44:
this.$ = new Match.default($$[$0-4], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column );
break;
case 45:
this.$ = new MatchDefault.default($$[$0-7], $$[$0-4], $$[$0-1], _$[$0-9].first_line, _$[$0-9].first_column );
break;
case 46:
this.$ = new Default.default($$[$0-1],_$[$0-8].first_line, _$[$0-8].first_column );
break;
case 47: case 48:
this.$ = new For.default($$[$0-8], $$[$0-6],$$[$0-4],$$[$0-1],_$[$0-10].first_line, _$[$0-10].first_column );
break;
case 49:
this.$ = new Loop.default($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column );
break;
case 55:
this.$ = new ObjetoMatch.default($$[$0-2], $$[$0],_$[$0-3].first_line, _$[$0-3].first_column );
break;
case 56:
this.$ = new If.default($$[$0-4], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column);
break;
case 57:
this.$ = new IfElse.default($$[$0-8], $$[$0-5],$$[$0-1],_$[$0-10].first_line, _$[$0-10].first_column);
break;
case 58:
this.$ = new Elif.default($$[$0-6], $$[$0-3],$$[$0],_$[$0-8].first_line, _$[$0-8].first_column);
break;
case 59:
this.$ = new While.default($$[$0-4], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column );
break;
case 60:
this.$ = new DoWhile.default($$[$0-1], $$[$0-5], _$[$0-7].first_line, _$[$0-7].first_column );
break;
case 61:
this.$ = new Break.default(_$[$0].first_line, _$[$0].first_column );
break;
case 62:
this.$ = new Continue.default(_$[$0].first_line, _$[$0].first_column );
break;
case 63:
this.$ = new Return.default($$[$0], _$[$0-1].first_line, _$[$0-1].first_column );
break;
case 64:
this.$ = new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $$[$0-6], $$[$0-4], $$[$0-1], _$[$0-8].first_line, _$[$0-8].first_column);
break;
case 65:
this.$ = new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $$[$0-5], [], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column);
break;
case 66:
this.$ = new Funcion.default($$[$0-7], $$[$0-6], $$[$0-4], $$[$0-1], $$[$0-7], _$[$0-8].first_line, _$[$0-8].first_column);
break;
case 67:
this.$ = new Funcion.default($$[$0-6], $$[$0-5], [], $$[$0-1], $$[$0-6], _$[$0-7].first_line, _$[$0-7].first_column);
break;
case 70:
this.$ = {tipo:$$[$0-2], id:$$[$0-4], valor:$$[$0]};
break;
case 71:
this.$ = {tipo:$$[$0], id:$$[$0-2], valor:null};
break;
case 72:
this.$ = new Run.default($$[$0-3], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column);
break;
case 73:
this.$ = new Run.default($$[$0-2], [], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 74:
this.$ = new Llamada.default($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column);
break;
case 75:
this.$ = new Llamada.default($$[$0-2], [], _$[$0-2].first_line, _$[$0-2].first_column);
break;
case 78:
this.$ = {id:$$[$0-2], valor:$$[$0]};
break;
case 79:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.UNARIA,_$[$0-1].first_line, _$[$0-1].first_column,$$[$0],$$[$0]);
break;
case 80:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA,_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 81:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA,_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 82:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.MULTIPLICACION,_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 83:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.DIVISION,_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 84:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.POTENCIA,_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 85:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.RAIZ,_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 86:
this.$ = new Aritmeticas.default(Aritmeticas.Operadores.MODULO,_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 87: case 96:
this.$=$$[$0]
break;
case 89:
this.$ = new AccesoVar.default($$[$0], _$[$0].first_line, _$[$0].first_column);
break;
case 90:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 91:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 92:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.STRING), $$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 93:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), true,_$[$0].first_line, _$[$0].first_column);
break;
case 94:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), false,_$[$0].first_line, _$[$0].first_column);
break;
case 95:
this.$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CHAR), $$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 97:
this.$ = new AccesoVector.default($$[$0-3], $$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 98:
this.$ = new AccesoMatriz.default($$[$0-6], $$[$0-4], $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column);
break;
case 99:
this.$ = new Relacionales.default(Relacionales.Relacional.MENOR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column );
break;
case 100:
this.$ = new Relacionales.default(Relacionales.Relacional.IGUALDAD, $$[$0-3], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column );
break;
case 101:
this.$ = new Relacionales.default(Relacionales.Relacional.DIFERENTE, $$[$0-3], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column );
break;
case 102:
this.$ = new Relacionales.default(Relacionales.Relacional.MENORIGUAL, $$[$0-3], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column );
break;
case 103:
this.$ = new Relacionales.default(Relacionales.Relacional.MAYOR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column );
break;
case 104:
this.$ = new Relacionales.default(Relacionales.Relacional.MAYORIGUAL, $$[$0-3], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column );
break;
case 105:
this.$ = new Relacionales.default(Relacionales.Relacional.AND, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column );
break;
case 106:
this.$ = new Relacionales.default(Relacionales.Relacional.OR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column );
break;
case 107:
this.$ = new Relacionales.default(Relacionales.Relacional.NOT, $$[$0], $$[$0], _$[$0-1].first_line, _$[$0-1].first_column );
break;
case 108:
this.$="let"
break;
case 109:
this.$="const"
break;
case 110:
this.$=new Tipo.default(Tipo.tipoDato.ENTERO);
break;
case 111:
this.$=new Tipo.default(Tipo.tipoDato.DECIMAL);
break;
case 112:
this.$=new Tipo.default(Tipo.tipoDato.STRING);
break;
case 113:
this.$=new Tipo.default(Tipo.tipoDato.BOOL);
break;
case 114:
this.$=new Tipo.default(Tipo.tipoDato.CHAR);
break;
        }
    }
}


/* generated by @ts-jison/lexer-generator 0.4.1-alpha.2 */
import { JisonLexer, JisonLexerApi } from '@ts-jison/lexer';

export class ProyectoLexer extends JisonLexer implements JisonLexerApi {
    options: any = {"case-insensitive":true,"moduleName":"Proyecto"};
    constructor (yy = {}) {
        super(yy);
    }

    rules: RegExp[] = [
        /^(?:[/][/][^\n]*)/i,
        /^(?:[/][*](?:[^*]|\*[^/])*[*][/])/i,
        /^(?:int\b)/i,
        /^(?:double\b)/i,
        /^(?:string\b)/i,
        /^(?:char\b)/i,
        /^(?:echo\b)/i,
        /^(?:if\b)/i,
        /^(?:else\b)/i,
        /^(?:false\b)/i,
        /^(?:true\b)/i,
        /^(?:bool\b)/i,
        /^(?:while\b)/i,
        /^(?:for\b)/i,
        /^(?:ejecutar\b)/i,
        /^(?:void\b)/i,
        /^(?:let\b)/i,
        /^(?:const\b)/i,
        /^(?:cast\b)/i,
        /^(?:as\b)/i,
        /^(?:break\b)/i,
        /^(?:continue\b)/i,
        /^(?:switch\b)/i,
        /^(?:case\b)/i,
        /^(?:default\b)/i,
        /^(?:do\b)/i,
        /^(?:until\b)/i,
        /^(?:loop\b)/i,
        /^(?:new\b)/i,
        /^(?:vector\b)/i,
        /^(?:function\b)/i,
        /^(?:return\b)/i,
        /^(?:;)/i,
        /^(?::)/i,
        /^(?:\+)/i,
        /^(?:-)/i,
        /^(?:\*)/i,
        /^(?:\/)/i,
        /^(?:\^)/i,
        /^(?:\$)/i,
        /^(?:%)/i,
        /^(?:\()/i,
        /^(?:\))/i,
        /^(?:\[)/i,
        /^(?:\])/i,
        /^(?:=)/i,
        /^(?:\{)/i,
        /^(?:\})/i,
        /^(?:<)/i,
        /^(?:>)/i,
        /^(?:!)/i,
        /^(?:&&)/i,
        /^(?:\|\|)/i,
        /^(?:,)/i,
        /^(?:[0-9]+\.[0-9]+)/i,
        /^(?:[0-9]+)/i,
        /^(?:[\"][^\"]*[\"])/i,
        /^(?:[\'](?:[^\'\\]|\\[ntr]|[\\][\\]|[\\][\'])[\'])/i,
        /^(?:[a-z][a-z0-9_]*)/i,
        /^(?:[\ \r\t\f])/i,
        /^(?:[\ \n])/i,
        /^(?:$)/i,
        /^(?:)/i
    ];
    conditions: any = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
          var YYSTATE=YY_START;
        switch($avoiding_name_collisions) {
    case 0:
      break;
    case 1:
      break;
    case 2:return 93
      break;
    case 3:return 94
      break;
    case 4:return 95
      break;
    case 5:return 97
      break;
    case 6:return 27
      break;
    case 7:return 59
      break;
    case 8:return 60
      break;
    case 9:return 84
      break;
    case 10:return 83
      break;
    case 11:return 96
      break;
    case 12:return 61
      break;
    case 13:return 54
      break;
    case 14:return 71
      break;
    case 15:return 68
      break;
    case 16:return 91
      break;
    case 17:return 92
      break;
    case 18:return 37
      break;
    case 19:return 39
      break;
    case 20:return 64
      break;
    case 21:return 65
      break;
    case 22:return 49
      break;
    case 23:return 58
      break;
    case 24:return 53
      break;
    case 25:return 62
      break;
    case 26:return 63
      break;
    case 27:return 56
      break;
    case 28:return 43
      break;
    case 29:return 44
      break;
    case 30:return 67
      break;
    case 31:return 66
      break;
    case 32:return 8
      break;
    case 33:return 34
      break;
    case 34:return 30
      break;
    case 35:return 31
      break;
    case 36:return 74
      break;
    case 37:return 75
      break;
    case 38:return 76
      break;
    case 39:return 77
      break;
    case 40:return 78
      break;
    case 41:return 38
      break;
    case 42:return 40
      break;
    case 43:return 41
      break;
    case 44:return 42
      break;
    case 45:return 36
      break;
    case 46:return 50
      break;
    case 47:return 52
      break;
    case 48:return 86
      break;
    case 49:return 88
      break;
    case 50:return 87
      break;
    case 51:return 89
      break;
    case 52:return 90
      break;
    case 53:return 47
      break;
    case 54:return 81
      break;
    case 55:return 80
      break;
    case 56:yy_.yytext = yy_.yytext.substring(1,yy_.yyleng-1); return "CADENA"
      break;
    case 57:yy_.yytext = yy_.yytext.substring(1,yy_.yyleng-1); return "CHAR"
      break;
    case 58:return 29
      break;
    case 59:
      break;
    case 60:
      break;
    case 61:return 5
      break;
    case 62:
    

      break;
        }
    }
}


