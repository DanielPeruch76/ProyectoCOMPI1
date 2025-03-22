%{
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
  const IfTernario = require('./instrucciones/IfTernario')
  const ReturnDefault = require('./instrucciones/ReturnDefault')
  const Lower = require('./instrucciones/Lower')
  const Upper = require('./instrucciones/Upper')
  const Round = require('./instrucciones/Round')
  const Lenght = require('./instrucciones/Lenght')
  const Truncate = require('./instrucciones/Truncate')
  const ToString = require('./instrucciones/ToString')
  const CharArray = require('./instrucciones/CharArray')
  const Reverse = require('./instrucciones/Reverse')
%}


%lex

%options case-insensitive

%%
[/][/][^\n]*               {};
[/][*]([^*]|\*[^/])*[*][/] {};
"int"                   return 'INT'
"double"                return 'DOUBLE'
"string"                return 'STRING'
"char"                  return 'CARACTER'
"echo"                 return 'TKPRINT'
"if"                    return 'IF'
"else"                  return 'ELSE'
"false"                 return 'FALSE'
"true"                  return 'TRUE'
"bool"                  return 'BOOL'
"while"                 return 'WHILE'
"for"                 return 'FOR'
"ejecutar"                   return 'RUN'
"void"                  return 'VOID'
"let"                  return 'LET'
"const"                  return 'CONST'
"cast"                  return 'CAST'
"as"                  return 'AS'
"break"                 return 'BREAK'
"continue"              return 'CONTINUE'
"switch"                return 'SWITCH'
"case"                return 'CASE'
"default"               return 'DEFAULT'
"do"               return 'DO'
"until"               return 'UNTIL'
"loop"                return 'LOOP'
"new"                 return 'NEW'
"vector"              return 'VECTOR'
"function"            return 'FUNCTION'
"return"              return 'RETURN'
"null"                return 'NULL'
"lower"                return 'LOWER'
"upper"                return 'UPPER'
"round"                return 'ROUND'
"len"                  return 'LEN'
"truncate"                  return 'TRUNCATE'
"toString"            return 'TOSTRING'
"toCharArray"         return 'TOCHARARRAY'
"reverse"         return 'REVERSE'
";"                     return 'PUNTOCOMA'
":"                     return 'DOSPUNTOS'
"+"                     return 'MAS'
"-"                     return 'MENOS'
"*"                     return 'MULTIPLICACION'
"/"                     return 'DIVISION'
"^"                     return 'POTENCIA'
"$"                     return 'RAIZ'
"%"                     return 'MODULO'
"("                     return 'PAR1'
")"                     return 'PAR2'
"["                     return 'COR1'
"]"                     return 'COR2'
"="                     return 'IGUAL'
"{"                     return 'LLAVE1'
"}"                     return 'LLAVE2'
"<"                     return 'MENOR'
">"                     return 'MAYOR'
"!"                     return 'NEGACION'
"&&"                     return 'AND'
"||"                     return 'OR'
","                     return 'COMA'
[0-9]+"."[0-9]+         return 'DECIMAL'
[0-9]+                  return 'ENTERO'
[\"][^\"]*[\"]          {yytext = yytext.substring(1,yyleng-1); return "CADENA"}
[\']([^\'\\]|\\[ntr]|[\\][\\]|[\\][\'])[\'] {yytext = yytext.substring(1,yyleng-1); return "CHAR"}
[a-z][a-z0-9_]*         return 'ID'
[\ \r\t\f]              {};
[\ \n]                  {};


<<EOF>>                 return 'EOF'


%{
    
%}


/lex

%left 'OR'
%left 'AND'
%right 'NEGACION'
%left Noigual, Igualdad
%left 'IGUAL', 'MENOR', 'MAYOR', Mayorigual, Menorigual
%left 'MAS', 'MENOS'
%left 'DIVISION', 'MULTIPLICACION', 'MODULO'
%left 'POTENCIA','RAIZ'
%right Umenos

%start INICIO

%%

INICIO : INSTRUCCIONES EOF                  {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   {$1.push($2); $$ = $1;}
              | INSTRUCCION                 {$$ = [$1];}
;

INSTRUCCION : IMPRESION PUNTOCOMA     {$$ = $1;}
            | DECLARACION PUNTOCOMA   {$$ = $1;}
            | MULTIPLEDECLARACION PUNTOCOMA   {$$ = $1;}
            | ASIGNACION PUNTOCOMA    {$$ = $1;}
            | INCREMENTO PUNTOCOMA    {$$ = $1;}
            | DECREMENTO PUNTOCOMA    {$$ = $1;}
            | SIF                     {$$ = $1;}
            | SBREAK PUNTOCOMA                    {$$ = $1;}
            | SCONTINUE PUNTOCOMA                     {$$ = $1;}
            | SRETURN PUNTOCOMA                     {$$ = $1;}
            | SRETURNSOLO PUNTOCOMA                     {$$ = $1;}
            | SDO PUNTOCOMA                     {$$ = $1;}
            | SWHILE                  {$$ = $1;}
            | SLOOP                   {$$ = $1;}
            | SFOR                  {$$ = $1;}
            | SSWITCH                  {$$ = $1;}
            | METODO                  {$$ = $1;}
            | FUNCIONES               {$$ = $1;} 
            | EJECUTAR PUNTOCOMA      {$$ = $1;}
            | LLAMADA PUNTOCOMA       {$$ = $1;}
            | FUNCIONREVERSE PUNTOCOMA       {$$ = $1;}
;

IMPRESION : TKPRINT EXPRESION  {$$ = new Print.default($2, @1.first_line, @1.first_column)}
;

INCREMENTO : ID MAS MAS  {$$ = new Incremento.default($1, @1.first_line, @1.first_column);}
;

DECREMENTO : ID MENOS MENOS  {$$ = new Decremento.default($1, @1.first_line, @1.first_column);}
;


DECLARACION : MUTABILIDAD LISTAID DOSPUNTOS TIPOS IGUAL EXPRESION  {$$ = new Declaracion.default($4, @1.first_line, @1.first_column, $2[0], $6,$1);}
            | MUTABILIDAD LISTAID DOSPUNTOS TIPOS IGUAL CAST PAR1 EXPRESION AS TIPOS PAR2  {$$ = new Casteo.default($4, $10,@1.first_line, @1.first_column, $2[0], $8,$1);}
            | MUTABILIDAD LISTAID DOSPUNTOS TIPOS COR1 COR2 IGUAL NEW VECTOR TIPOS COR1 EXPRESION COR2  {$$ = new DeclaracionVector.default($4,@1.first_line, @1.first_column,$1,$2[0], $10,$12);}
            | MUTABILIDAD LISTAID DOSPUNTOS TIPOS COR1 COR2 COR1 COR2 IGUAL NEW VECTOR TIPOS COR1 EXPRESION COR2 COR1 EXPRESION COR2 {$$ = new DeclaracionMatriz.default($4,@1.first_line, @1.first_column,$1,$2[0], $12,$14,$17);}
            |MUTABILIDAD LISTAID DOSPUNTOS TIPOS COR1 COR2 COR1 COR2 IGUAL COR1 LISTAMATRIZ COR2 { $$ = new DeclaracionMatrizDefecto.default($4,@1.first_line, @1.first_column,$1,$2[0],$11); }
            |MUTABILIDAD LISTAID DOSPUNTOS TIPOS COR1 COR2 IGUAL LISTAVECTOR { $$ = new DeclararArregloDefecto.default($4,@1.first_line, @1.first_column,$1,$2[0],$8); }
            |MUTABILIDAD LISTAID DOSPUNTOS TIPOS IGUAL SIFTERNARIO  {$$ = new Declaracion.default($4, @1.first_line, @1.first_column, $2[0], $6,$1);}
            |MUTABILIDAD LISTAID DOSPUNTOS TIPOS COR1 COR2 IGUAL EXPRESION {$$ = new Declaracion.default($4, @1.first_line, @1.first_column, $2[0], $8,$1);}
;

FUNCIONREVERSE: REVERSE PAR1 ID PAR2  {$$ = new Reverse.default($3, @1.first_line, @1.first_column);}
;

LISTAMATRIZ: LISTAMATRIZ COMA LISTAVECTOR {$1.push($3); $$ = $1;}
            |LISTAVECTOR {$$ = [$1];}
;

LISTAVECTOR: COR1 VALORESMATRIZ COR2 {$$ = $2;}
;

VALORESMATRIZ: VALORESMATRIZ COMA EXPRESION {$1.push($3); $$ = $1;}
                | EXPRESION {$$ = [$1];}
;

MULTIPLEDECLARACION:  MUTABILIDAD LISTAID DOSPUNTOS TIPOS {$$ = new DeclaracionDefecto.default($4, @1.first_line, @1.first_column, $2,$1);}
;

LISTAID : LISTAID COMA ID {$1.push($3); $$ = $1;}
        | ID {$$ = [$1];}
;

ASIGNACION : ID IGUAL EXPRESION   {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column );}
           | ID IGUAL CAST PAR1 EXPRESION AS TIPOS PAR2   {$$ = new CasteoAsignacion.default($1, $7,$5, @1.first_line, @1.first_column );}
           | ID COR1 EXPRESION COR2 IGUAL EXPRESION {$$ = new AsignacionVector.default($1, $3,$6, @1.first_line, @1.first_column );}
           | ID COR1 EXPRESION COR2 COR1 EXPRESION COR2 IGUAL EXPRESION {$$ = new AsignacionMatriz.default($1, $3,$6, $9, @1.first_line, @1.first_column );}
           |ID IGUAL SIFTERNARIO   {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column );}
           || ID COR1 EXPRESION COR2 IGUAL SIFTERNARIO {$$ = new AsignacionVector.default($1, $3,$6, @1.first_line, @1.first_column );}
;

SSWITCH: SWITCH PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONESMATCH LLAVE2{$$ = new Match.default($3, $6, @1.first_line, @1.first_column );} 
       | SWITCH PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONESMATCH DEFAULT DOSPUNTOS INSTRUCCIONES LLAVE2{$$ = new MatchDefault.default($3, $6, $9, @1.first_line, @1.first_column );} 
       | SWITCH PAR1 EXPRESION PAR2 LLAVE1 DEFAULT DOSPUNTOS INSTRUCCIONES LLAVE2 {$$ = new Default.default($8,@1.first_line, @1.first_column );} 
;

SFOR: FOR PAR1 ASIGNACION PUNTOCOMA EXPRESION PUNTOCOMA ACTUALIZARFOR PAR2 LLAVE1 INSTRUCCIONES LLAVE2 {$$ = new For.default($3, $5,$7,$10,@1.first_line, @1.first_column );} 
    | FOR PAR1 DECLARACION PUNTOCOMA EXPRESION PUNTOCOMA ACTUALIZARFOR PAR2 LLAVE1 INSTRUCCIONES LLAVE2 {$$ = new For.default($3, $5,$7,$10,@1.first_line, @1.first_column );} 
;

SLOOP: LOOP LLAVE1 INSTRUCCIONES LLAVE2 {$$ = new Loop.default($3,@1.first_line, @1.first_column );}  
;


ACTUALIZARFOR: ID IGUAL EXPRESION {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column );}
             | ID MAS MAS  {$$ = new Incremento.default($1, @1.first_line, @1.first_column);} 
             | ID MENOS MENOS  {$$ = new Decremento.default($1, @1.first_line, @1.first_column);}
;

INSTRUCCIONESMATCH: INSTRUCCIONESMATCH SENTENCIAMATCH {$1.push($2); $$ = $1;}
                  | SENTENCIAMATCH {$$ = [$1];}
;

SENTENCIAMATCH: CASE EXPRESION DOSPUNTOS INSTRUCCIONES {$$ = new ObjetoMatch.default($2, $4,@1.first_line, @1.first_column );}
;

SIF : IF PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONES LLAVE2    {$$ = new If.default($3, $6, @1.first_line, @1.first_column);}
    | IF PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONES LLAVE2 ELSE LLAVE1 INSTRUCCIONES LLAVE2   {$$ = new IfElse.default($3, $6,$10,@1.first_line, @1.first_column);}
    | IF PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONES LLAVE2 ELSE SIF   {$$ = new Elif.default($3, $6,$9,@1.first_line, @1.first_column);}
;

SIFTERNARIO:IF PAR1 EXPRESION PAR2 EXPRESION DOSPUNTOS EXPRESION    {$$ = new IfTernario.default($3, $5, $7, @1.first_line, @1.first_column);}
           |IF PAR1 EXPRESION PAR2 SIFTERNARIO DOSPUNTOS SIFTERNARIO    {$$ = new IfTernario.default($3, $5, $7, @1.first_line, @1.first_column);}
           |IF PAR1 EXPRESION PAR2 EXPRESION DOSPUNTOS SIFTERNARIO    {$$ = new IfTernario.default($3, $5, $7, @1.first_line, @1.first_column);}
           |IF PAR1 EXPRESION PAR2 SIFTERNARIO DOSPUNTOS EXPRESION    {$$ = new IfTernario.default($3, $5, $7, @1.first_line, @1.first_column);}
;

SWHILE : WHILE PAR1 EXPRESION PAR2 LLAVE1 INSTRUCCIONES LLAVE2  {$$ = new While.default($3, $6, @1.first_line, @1.first_column );}
;

SDO: DO LLAVE1 INSTRUCCIONES LLAVE2 UNTIL PAR1 EXPRESION PAR2  {$$ = new DoWhile.default($7, $3, @1.first_line, @1.first_column );}
;

SBREAK: BREAK {$$ = new Break.default(@1.first_line, @1.first_column );}
;
SCONTINUE: CONTINUE {$$ = new Continue.default(@1.first_line, @1.first_column );}
;

SRETURN: RETURN EXPRESION {$$ = new Return.default($2, @1.first_line, @1.first_column );}
       | RETURN SIFTERNARIO  {$$ = new Return.default($2, @1.first_line, @1.first_column );}
;

SRETURNSOLO: RETURN {$$ = new ReturnDefault.default(@1.first_line, @1.first_column );}
;

METODO :FUNCTION VOID ID PAR1 PARAMS PAR2 LLAVE1 INSTRUCCIONES LLAVE2   {$$ = new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $3, $5, $8, @1.first_line, @1.first_column);}
       | FUNCTION VOID ID PAR1 PAR2 LLAVE1 INSTRUCCIONES LLAVE2          {$$ = new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $3, [], $7, @1.first_line, @1.first_column);}
;                                                               

FUNCIONES : FUNCTION TIPOS ID PAR1 PARAMS PAR2 LLAVE1 INSTRUCCIONES LLAVE2 {$$ = new Funcion.default($2, $3, $5, $8, $2, @1.first_line, @1.first_column);} 
          | FUNCTION TIPOS ID PAR1 PAR2 LLAVE1 INSTRUCCIONES LLAVE2        {$$ = new Funcion.default($2, $3, [], $7, $2, @1.first_line, @1.first_column);}
;


PARAMS : PARAMS COMA PARAM    {$1.push($3); $$ = $1;}
       | PARAM                {$$ = [$1];}
;

PARAM : ID DOSPUNTOS TIPOS IGUAL EXPRESION    {$$ = {tipo:$3, id:$1, valor:$5};}
      | ID DOSPUNTOS TIPOS                   {$$ = {tipo:$3, id:$1, valor:null};}
;

EJECUTAR : RUN ID PAR1 PARAMSCALL PAR2    {$$ = new Run.default($2, $4, @1.first_line, @1.first_column);}
         | RUN ID PAR1 PAR2               {$$ = new Run.default($2, [], @1.first_line, @1.first_column);}
;

LLAMADA : ID PAR1 PARAMSCALL PAR2     {$$ = new Llamada.default($1, $3, @1.first_line, @1.first_column);}
        | ID PAR1 PAR2                {$$ = new Llamada.default($1, [], @1.first_line, @1.first_column);}
;

PARAMSCALL : PARAMSCALL COMA PARAMCALL    {$1.push($3); $$ = $1;}
           | PARAMCALL                    {$$ = [$1];}
;

PARAMCALL : ID IGUAL EXPRESION  {$$ = {id:$1, valor:$3};}
;



EXPRESION : MENOS EXPRESION %prec UMENOS {$$ = new Aritmeticas.default(Aritmeticas.Operadores.UNARIA,@1.first_line, @1.first_column,$2,$2);}
          | EXPRESION MAS EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA,@1.first_line, @1.first_column,$1,$3);}
          | EXPRESION MENOS EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA,@1.first_line, @1.first_column,$1,$3);}
          | EXPRESION MULTIPLICACION EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.MULTIPLICACION,@1.first_line, @1.first_column,$1,$3);}
          | EXPRESION DIVISION EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.DIVISION,@1.first_line, @1.first_column,$1,$3);}
          | EXPRESION POTENCIA EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.POTENCIA,@1.first_line, @1.first_column,$1,$3);}
          | EXPRESION RAIZ EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.RAIZ,@1.first_line, @1.first_column,$1,$3);}
          | EXPRESION MODULO EXPRESION   {$$ = new Aritmeticas.default(Aritmeticas.Operadores.MODULO,@1.first_line, @1.first_column,$1,$3);}
          | RELACIONALES {$$=$1}
          | PAR1 EXPRESION PAR2       {$$ = $2;}
          | ID                        {$$ = new AccesoVar.default($1, @1.first_line, @1.first_column);}
          | ENTERO                    {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1,@1.first_line, @1.first_column);}
          | DECIMAL                   {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1,@1.first_line, @1.first_column);}
          | CADENA                    {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.STRING), $1,@1.first_line, @1.first_column);}
          | TRUE                      {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), true,@1.first_line, @1.first_column);}
          | FALSE                     {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), false,@1.first_line, @1.first_column);}
          | CHAR                      {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CHAR), $1,@1.first_line, @1.first_column);}
          | NULL                      {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.NULL), null,@1.first_line, @1.first_column);}
          | LLAMADA {$$=$1}
          | ID COR1 EXPRESION COR2    {$$ = new AccesoVector.default($1, $3,@1.first_line, @1.first_column);}
          | ID COR1 EXPRESION COR2 COR1 EXPRESION COR2    {$$ = new AccesoMatriz.default($1, $3, $6, @1.first_line, @1.first_column);}
          | LOWER PAR1 EXPRESION PAR2  {$$ = new Lower.default($3, @1.first_line, @1.first_column);}
          | UPPER PAR1 EXPRESION PAR2  {$$ = new Upper.default($3, @1.first_line, @1.first_column);}
          | ROUND PAR1 EXPRESION PAR2  {$$ = new Round.default($3, @1.first_line, @1.first_column);}
          | LEN PAR1 EXPRESION PAR2  {$$ = new Lenght.default($3, @1.first_line, @1.first_column);}
          | TRUNCATE PAR1 EXPRESION PAR2  {$$ = new Truncate.default($3, @1.first_line, @1.first_column);}
          | TOSTRING PAR1 EXPRESION PAR2  {$$ = new ToString.default($3, @1.first_line, @1.first_column);}
          | TOCHARARRAY PAR1 EXPRESION PAR2  {$$ = new CharArray.default($3, @1.first_line, @1.first_column);}
          | FUNCIONREVERSE {$$=$1}
;

RELACIONALES: EXPRESION MENOR EXPRESION {$$ = new Relacionales.default(Relacionales.Relacional.MENOR, $1, $3, @1.first_line, @1.first_column );}
            | EXPRESION IGUAL IGUAL EXPRESION %prec Igualdad {$$ = new Relacionales.default(Relacionales.Relacional.IGUALDAD, $1, $4, @1.first_line, @1.first_column );}
            | EXPRESION NEGACION IGUAL EXPRESION %prec Noigual {$$ = new Relacionales.default(Relacionales.Relacional.DIFERENTE, $1, $4, @1.first_line, @1.first_column );}
            | EXPRESION MENOR IGUAL EXPRESION %prec Menorigual {$$ = new Relacionales.default(Relacionales.Relacional.MENORIGUAL, $1, $4, @1.first_line, @1.first_column );}
            | EXPRESION MAYOR EXPRESION {$$ = new Relacionales.default(Relacionales.Relacional.MAYOR, $1, $3, @1.first_line, @1.first_column );}
            | EXPRESION MAYOR IGUAL EXPRESION %prec Mayorigual {$$ = new Relacionales.default(Relacionales.Relacional.MAYORIGUAL, $1, $4, @1.first_line, @1.first_column );}
            | EXPRESION AND EXPRESION {$$ = new Relacionales.default(Relacionales.Relacional.AND, $1, $3, @1.first_line, @1.first_column );}
            | EXPRESION OR EXPRESION {$$ = new Relacionales.default(Relacionales.Relacional.OR, $1, $3, @1.first_line, @1.first_column );}
            | NEGACION EXPRESION {$$ = new Relacionales.default(Relacionales.Relacional.NOT, $2, $2, @1.first_line, @1.first_column );}
;

MUTABILIDAD: LET {$$="let"}
           | CONST {$$="const"}
;

TIPOS : INT       {$$=new Tipo.default(Tipo.tipoDato.ENTERO);}
      | DOUBLE    {$$=new Tipo.default(Tipo.tipoDato.DECIMAL);}
      | STRING    {$$=new Tipo.default(Tipo.tipoDato.STRING);}
      | BOOL      {$$=new Tipo.default(Tipo.tipoDato.BOOL);}
      | CARACTER      {$$=new Tipo.default(Tipo.tipoDato.CHAR);}
      | NULL      {$$=new Tipo.default(Tipo.tipoDato.NULL);}
;