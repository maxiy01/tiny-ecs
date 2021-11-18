# TSTL tiny-ecs

Declarations for [tiny-ecs](https://github.com/bakpakin/tiny-ecs), Entity Component System for Lua that's simple, flexible, and useful.


| Command | Description |
|-|-|
| `yarn add -D tstl-tiny-ecs` | Install these declarations |
| `yarn add bakpakin/tiny-ecs` | Install tiny-ecs |


Upon installation these declarations can be linked to a _tsconfig.json_ file.

```json
{
    "compilerOptions": {
        "types": [
            "tstl-tiny-ecs"
        ]
    }
}
```

And used within any _.ts_ file.

```ts
import * as tiny from "tiny";
declare let world: tiny.World;

class Vec2
{
    constructor(public x: number = 0, public y: number = 0)
    {
    }
}

interface HasPositionComponent
{
    position: Vec2;
}

interface HasVelocityComponent
{
    velocity: Vec2;
}

class Unit implements HasPositionComponent, HasVelocityComponent
{
    position: Vec2;
    velocity: Vec2;
    constructor(pos_x: number = 0, pos_y: number = 0, vx: number = 0, vy: number = 0)
    {
        this.position = new Vec2(pos_x,pos_y);
        this.velocity = new Vec2(vx,vy);
    }
}

declare let unit: Unit;

love.load = () => {
    world = tiny.world();
    
    unit = new Unit(0,0,10,5);

    world.addEntity(unit);

    let physicsSystem = tiny.processingSystem();
    
    physicsSystem.filter = tiny.requireAll('position','velocity');
    
    physicsSystem.process = (e: HasPositionComponent & HasVelocityComponent, dt: number) => {
        e.position.x += e.velocity.x*dt;
        e.position.y += e.velocity.y*dt;
    };

    world.addSystem(physicsSystem);
};

love.update = (dt: number) => {
    world.update(dt);
    print("unit.x =",unit.position.x,"; unit.y =",unit.position.y);
}
```

Make sure to append `";./node_modules/tiny-ecs/?.lua"` to your `package.path` in a _conf.ts_ file (this is run first) to assist where Lua looks for modules.

```ts
package.path += ";./node_modules/tiny-ecs/?.lua";
```

Also you need to add `"typescript-to-lua/language-extensions"` to _tsconfig.json_ file.
```json
{
    "compilerOptions": {
        "types": [
            "typescript-to-lua/language-extensions"
        ]
    }
}
```