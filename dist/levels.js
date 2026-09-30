import {compile,interval} from './math.js';
const specs=[
 ['rampa','La rampa','Rectas','Fácil','0.5*x+1',10,[2,5,8],[[4,-1,1,2.8],[7,6.5,1.1,2]],'La pendiente te dice cuánto subís por cada paso hacia la derecha.','Probá la forma m*x+b. b es la altura inicial; m, la pendiente.'],
 ['salto','El salto','Cuadráticas','Fácil','-0.2*(x-5)^2+6',10,[2,5,8],[[3,-1,4,4.8]],'Una parábola que abre hacia abajo puede pasar sobre el muro.','En a*(x-h)^2+k, (h,k) es el vértice. a<0 hace que abra hacia abajo.'],
 ['valle','Por debajo','Cuadráticas','Media','0.2*(x-5)^2+1',10,[2,5,8],[[3,4.4,4,4]],'Esta vez el camino baja antes de volver a subir.','Un valor positivo de a hace que la parábola abra hacia arriba.'],
 ['vertice','Punto de giro','Valor absoluto','Media','abs(x-5)+1',10,[2,5,8],[[3,4.6,4,3.8]],'Pensá en una V, con una esquina en el punto más bajo.','abs(x-h)+k mueve la esquina a (h,k).'],
 ['despegue','Despegue','Exponenciales','Media','2^(x/3)',9,[3,6,8],[[1,3.5,3,4.5],[6,-1,2,3]],'Sube despacio al principio y cada vez más rápido.','En b^(x/c), una base b>1 produce crecimiento. c modifica su rapidez.'],
 ['freno','Sin apuro','Logaritmos','Media','2*ln(x+1)+1',10,[1,4,8],[[3,-1,4,3.8],[6,7,3,1.7]],'La pendiente disminuye mientras avanzás.','ln(x+1) existe para x>-1. Multiplicar cambia la altura; sumar la desplaza.'],
 ['raiz','Primer impulso','Raíces','Media','2*sqrt(x)+1',10,[1,4,9],[[2,-1,5,3.6],[6,8,2,1]],'Mucho crecimiento al principio, después se aplana.','sqrt(x) comienza en x=0. Escalala y desplazala para conectar la salida.'],
 ['ola','La ola','Trigonométricas','Difícil','2*sin(pi*x/5)+4',10,[2.5,5,7.5],[[1,-1,2,4],[6,4.5,3,4]],'Necesitás una subida y una bajada en un mismo recorrido.','En A*sin(B*x)+D, A es la amplitud, 2*pi/B el período y D la altura central.'],
 ['eco','Doble frecuencia','Trigonométricas','Experta','2*sin(2*pi*x/5)+4',10,[1.25,3.75,6.25,8.75],[[.7,-1,1,4],[3,4.3,1.3,4],[5.8,-1,1.2,4],[8.2,4.3,1.2,4]],'El mapa repite su patrón dos veces.','Aumentar B en sin(B*x) comprime las ondas horizontalmente.'],
 ['orbita','Caída suave','Racionales','Difícil','6/(x+1)+1',10,[1,3,7],[[2,4,6,4],[4,-1,4,2.2]],'Caé rápido y acercate a una altura sin tocarla.','A/(x-h)+k tiene una asíntota vertical en x=h y una horizontal en y=k. No podés cruzar un punto indefinido.'],
 ['mixta','Pulso inclinado','Combinadas','Experta','0.4*x+2+sin(pi*x/2)',10,[1,3,5,7,9],[[2.5,4.1,1,3.8],[6.5,5.7,1,3],[4.5,-1,1,3.8]],'Una onda puede viajar sobre una recta.','Sumar funciones suma sus alturas para cada valor de x. Probá combinar tendencia y oscilación.'],
 ['libre','El desvío','Abierto','Experta','max(1,4-abs(x-5))',10,[2,5,8],[[4,-1,2,3.2],[1,3.1,2,5],[7,3.1,2,5]],'Hay muchas soluciones posibles. Buscá un camino bajo, un desvío central y una vuelta a la altura inicial.','min(f,g) y max(f,g) permiten combinar curvas continuas. También podés intentar otra familia.']
];
export const levels=specs.map(([id,name,family,difficulty,solution,endX,coins,obstacles,hint,explain],i)=>{const fn=compile(solution).fn;return{id,name,family,difficulty,solution,endX,coins:coins.map(x=>({x,y:fn(x)})),obstacles:obstacles.map(([x,y,w,h])=>({x,y,w,h})),hint,explain,index:i,start:{x:0,y:fn(0)},end:{x:endX,y:fn(endX)}}});
export const RADIUS=.12,CONNECT=.28,COIN_RADIUS=.36;
export function simulate(compiled,level){
 const points=[],coins=new Set();const result={points,coins:[],kind:'finish',message:'',x:0,y:level.start.y};
 const fail=(kind,message,x,y)=>Object.assign(result,{kind,message,x,y,coins:[...coins]});
 let initial=compiled.fn(0);if(!Number.isFinite(initial)||Math.abs(initial-level.start.y)>CONNECT)return fail('start',`No conectaste la salida: f(0) debe estar cerca de ${fmt(level.start.y)}.`,0,level.start.y);
 const count=4000;
 for(let i=0;i<=count;i++){let x=level.endX*i/count,y=compiled.fn(x);if(i>0){try{interval(compiled.ast,level.endX*(i-1)/count,x)}catch{return fail('domain','La función no está definida en todo el recorrido. No se puede saltar un hueco o una asíntota.',x,points.at(-1)?.y??initial)}}
 if(!Number.isFinite(y))return fail('domain','La función no está definida en este punto.',x,points.at(-1)?.y??initial);
 if(y<-.9||y>8.8)return fail('bounds','La trayectoria salió del mapa. Ajustá su altura o su escala.',x,y);
 points.push({x,y});for(const o of level.obstacles){if(x>=o.x-RADIUS&&x<=o.x+o.w+RADIUS&&y>=o.y-RADIUS&&y<=o.y+o.h+RADIUS)return fail('collision',`Choque en (${fmt(x)}, ${fmt(y)}). Cambiá la trayectoria para esquivar el obstáculo.`,x,y)}
 level.coins.forEach((c,j)=>{if(Math.hypot(x-c.x,y-c.y)<COIN_RADIUS+RADIUS)coins.add(j)});
 }
 const y=points.at(-1).y;if(Math.abs(y-level.end.y)>CONNECT)return fail('miss',`Pasaste ${y>level.end.y?'por arriba':'por abajo'} de la llegada. Necesitás f(${fmt(level.endX)}) cerca de ${fmt(level.end.y)}.`,level.endX,y);
 return fail('finish',coins.size===level.coins.length?'¡Trayectoria perfecta! Llegaste y recogiste todas las monedas.':'¡Llegaste! Podés volver a intentar para recoger las monedas que faltan.',level.endX,y);
}
export function fmt(v){return Number.isInteger(v)?String(v):v.toFixed(2).replace(/0+$/,'').replace(/\.$/,'')}
