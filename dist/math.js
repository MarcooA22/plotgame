/* Small expression parser. Never evaluates JavaScript. */
const FUNCS={sin:Math.sin,cos:Math.cos,tan:Math.tan,abs:Math.abs,sqrt:Math.sqrt,ln:Math.log,log:Math.log10,exp:Math.exp,min:Math.min,max:Math.max};
export function compile(source){
 if(source.length>300)throw Error('La expresión es demasiado larga (máximo 300 caracteres).');
 const s=source.toLowerCase().replace(/π/g,'pi').replace(/×|·/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/²/g,'^2').replace(/³/g,'^3').replace(/\*\*/g,'^');
 const tokens=[];let i=0;
 while(i<s.length){if(/\s/.test(s[i])){i++;continue}const n=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/);if(n){tokens.push({t:'n',v:+n[0]});i+=n[0].length;continue}const w=s.slice(i).match(/^[a-z]+/);if(w){tokens.push({t:'w',v:w[0]});i+=w[0].length;continue}if('+-*/^(),'.includes(s[i])){tokens.push({t:s[i],v:s[i++]});continue}throw Error(`No reconozco «${s[i]}». Usá números, x y las funciones de la ayuda.`);}
 let p=0;const peek=()=>tokens[p]?.t;const take=t=>{if(peek()!==t)throw Error(`Falta «${t}» o hay una expresión incompleta.`);return tokens[p++]};
 function primary(){if(peek()==='n')return {k:'n',v:tokens[p++].v};if(peek()==='('){p++;let a=sum();take(')');return a}if(peek()==='w'){let w=tokens[p++].v;if(['x','a','h','k'].includes(w))return{k:'v',v:w};if(['pi','e'].includes(w))return{k:'n',v:w==='pi'?Math.PI:Math.E};if(!FUNCS[w])throw Error(`No reconozco «${w}». Consultá la sintaxis admitida.`);take('(');let args=[sum()];while(peek()===','){p++;args.push(sum())}take(')');if((['min','max'].includes(w)&&args.length!==2)||(!['min','max'].includes(w)&&args.length!==1))throw Error(`Revisá la cantidad de argumentos de ${w}.`);return{k:'f',v:w,args};}throw Error('Completá la expresión antes de probar.');}
 function power(){let a=primary();if(peek()==='^'){p++;a={k:'b',v:'^',a,b:unary()}}return a}
 function unary(){if(peek()==='+'||peek()==='-'){let v=tokens[p++].v;return{k:'u',v,a:unary()}}return power()}
 function product(){let a=unary();while(['*','/','n','w','('].includes(peek())){let op=['*','/'].includes(peek())?tokens[p++].v:'*';a={k:'b',v:op,a,b:unary()}}return a}
 function sum(){let a=product();while(peek()==='+'||peek()==='-'){let v=tokens[p++].v;a={k:'b',v,a,b:product()}}return a}
 const ast=sum();if(p!==tokens.length)throw Error('Revisá los paréntesis y operadores.');
 function evaluate(n,x,params){if(n.k==='n')return n.v;if(n.k==='v')return n.v==='x'?x:params[n.v];if(n.k==='u')return(n.v==='-'?-1:1)*evaluate(n.a,x,params);if(n.k==='f')return FUNCS[n.v](...n.args.map(v=>evaluate(v,x,params)));let a=evaluate(n.a,x,params),b=evaluate(n.b,x,params);return n.v==='+'?a+b:n.v==='-'?a-b:n.v==='*'?a*b:n.v==='/'?a/b:a**b;}
 return {ast,fn:(x,params={a:1,h:0,k:0})=>evaluate(ast,x,params),source};
}
// Interval-domain checks catch poles/holes even between animation samples.
export function interval(n,lo,hi,params={a:1,h:0,k:0}){
 const rng=(a,b)=>[Math.min(a,b),Math.max(a,b)],bad=()=>{throw Error('La función deja de estar definida en el recorrido.')};
 if(n.k==='n')return[n.v,n.v];if(n.k==='v')return n.v==='x'?[lo,hi]:[params[n.v],params[n.v]];
 if(n.k==='u'){let a=interval(n.a,lo,hi,params);return n.v==='-'?[-a[1],-a[0]]:a}
 if(n.k==='f'){let a=interval(n.args[0],lo,hi,params),f=n.v;if(f==='ln'||f==='log'){if(a[0]<=0)bad();return a.map(FUNCS[f])}if(f==='sqrt'){if(a[0]<0)bad();return a.map(Math.sqrt)}if(f==='exp')return a.map(Math.exp);if(f==='abs')return[a[0]<=0&&a[1]>=0?0:Math.min(...a.map(Math.abs)),Math.max(...a.map(Math.abs))];if(f==='sin'||f==='cos'){if(a[1]-a[0]>=2*Math.PI)return[-1,1];let r=rng(FUNCS[f](a[0]),FUNCS[f](a[1]));let shift=f==='sin'?Math.PI/2:0;for(let j=Math.ceil((a[0]-shift)/Math.PI);j<=Math.floor((a[1]-shift)/Math.PI);j++){let v=j%2===0?1:-1;r=[Math.min(r[0],v),Math.max(r[1],v)]}return r;}if(f==='tan'){if(Math.ceil((a[0]-Math.PI/2)/Math.PI)<=Math.floor((a[1]-Math.PI/2)/Math.PI))bad();return rng(Math.tan(a[0]),Math.tan(a[1]))}let b=interval(n.args[1],lo,hi,params);return[f==='min'?Math.min(a[0],b[0]):Math.max(a[0],b[0]),f==='min'?Math.min(a[1],b[1]):Math.max(a[1],b[1])];}
 let a=interval(n.a,lo,hi,params),b=interval(n.b,lo,hi,params);if(n.v==='+')return[a[0]+b[0],a[1]+b[1]];if(n.v==='-')return[a[0]-b[1],a[1]-b[0]];if(n.v==='/'){if(b[0]<=0&&b[1]>=0)bad();b=rng(1/b[0],1/b[1]);}if(n.v==='*'||n.v==='/'){let v=[a[0]*b[0],a[0]*b[1],a[1]*b[0],a[1]*b[1]];return[Math.min(...v),Math.max(...v)]}if(b[0]!==b[1]){if(a[0]<=0)bad();let v=[a[0]**b[0],a[0]**b[1],a[1]**b[0],a[1]**b[1]];return[Math.min(...v),Math.max(...v)]}let e=b[0];if(!Number.isInteger(e)&&a[0]<0)bad();if(e<0&&a[0]<=0&&a[1]>=0)bad();let r=rng(a[0]**e,a[1]**e);if(e>0&&e%2===0&&a[0]<=0&&a[1]>=0)r[0]=0;return r;
}
