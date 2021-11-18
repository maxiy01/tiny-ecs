/**
 * @noResolution
 */
 declare module "tiny"
 {
     type Entity = LuaTable | Object;
     /**
      * A Filter is a function that selects which Entities apply to a System.
      * Filters take two parameters, the System and the Entity, and return a boolean
      * value indicating if the Entity should be processed by the System. A truthy
      * value includes the entity, while a falsey (nil or false) value excludes the entity
      * 
      * Filters must be added to Systems by setting the `filter` field of the System.
      * Filter's returned by tiny-ecs's Filter functions are immutable and can be
      * used by multiple Systems.
      */
     type Filter = (this: void, entity: Entity) => boolean;
     /**
      * Makes a Filter that selects Entities with all specified Components and Filters
      * @param components_and_filters 
      */
     function requireAll(this: void, ...components_and_filters: (string|Filter)[]): Filter;
     /**
      * Makes a Filter that selects Entities with at least one of specified Components and Filters
      * @param components_and_filters 
      */
     function requireAny(this: void, ...components_and_filters: (string|Filter)[]): Filter;
     /**
      * Makes a Filter that rejects Entities with all specified Components and Filters, and selects all other Entities.
      * @param components_and_filters 
      */
     function rejectAll(this: void, ...components_and_filters: (string|Filter)[]): Filter;
     /**
      * Makes a Filter that rejects Entities with at least one of the specified Components and Filters, and selects all other Entities.
      * @param components_and_filters 
      */
     function rejectAny(this: void, ...components_and_filters: (string|Filter)[]): Filter;
     /**
      * Makes a Filter from a string. Syntax of `pattern` is as follows:
      * 
      * - Tokens are alphanumeric strings including underscores.
      * - Tokens can be separated by |, &, or surrounded by parentheses.
      * - Tokens can be prefixed with !, and are then inverted.
      * 
      * Examples are best:
      * - `'a|b|c'` - Matches entities with an 'a' OR 'b' OR 'c'.
      * - `'a&!b&c'` - Matches entities with an 'a' AND NOT 'b' AND 'c'.
      * - `'a|(b&c&d)|e' `- Matches 'a' OR ('b' AND 'c' AND 'd') OR 'e'
      * 
      * @param pattern 
      */
     function filter(this: void, pattern: string): Filter;
 
     /**
      * A World is a container that manages Entities and Systems. Typically, a program uses one World at a time.
      */
     class World
     {
         /**
          * Shortcut for adding multiple Entities and Systems to the World. Returns all added Entities and Systems. 
          * @param entities_and_systems
          * @returns all added Entities and Systems
          */
         add(...entities_and_systems: (Entity | System)[]): (Entity | System)[];
         /**
          * Adds an Entity to the world. Also call this on Entities that have changed Components such that they match different Filters. Returns the Entity. 
          * @param entity 
          * @returns added Entity
          */
         addEntity(entity: Entity): Entity;
         /**
          * Adds a System to the world. Returns the System. 
          * @param system 
          * @returns added System
          */
         addSystem(system: System): System;
         /**
          * Removes an Entity from the World. Returns the Entity. 
          * @param entity 
          * @returns removed Entity
          */
         removeEntity(entity: Entity): Entity;
         /**
          * Removes a System from the world. Returns the System. 
          * @param system 
          * @returns removed System
          */
         removeSystem(system: System): System;
         /**
          * Shortcut for removing multiple Entities and Systems from the World. Returns all removed Systems and Entities 
          * @param entities_and_systems 
          * @returns removed Entities and Systems
          */
         remove(...entities_and_systems: (Entity | System)[]): (Entity | System)[];
         /**
          * Manages Entities and Systems marked for deletion or addition. Call this before modifying Systems and Entities outside of a call to `tiny.update`. Do not call this within a call to `tiny.update`. 
          */
         refresh(): void;
         /**
          * Updates the World by dt (delta time). Takes an optional parameter, filter, which is a Filter that selects Systems from the World, and updates only those Systems. If filter is not supplied, all Systems are updated. Put this function in your main loop. 
          * @param dt 
          * @optional `filter`
          */
         update(dt: number, filter?: Filter): void;
         /**
          * Removes all Entities from the World. 
          */
         clearEntities(): void;
         /**
          * Removes all systems from the World. 
          */
         clearSystems(): void;
         /**
          * Gets number of Entities in the World. 
          */
         getEntityCount(): number;
         /**
          * Gets number of Systems in the World. 
          */
         getSystemCount(): number;
         /**
          * Sets the index of a System in the World, and returns the old index. Changes the order in which they Systems processed, because lower indexed Systems are processed first. Returns the old system.index. 
          * @param system 
          * @param index 
          * @returns old index of `system`
          */
         setSystemIndex(system: System, index: number): number;
     }
     /**
      * Creates a new World. Can optionally add default Systems and Entities. Returns the new World along with default Entities and Systems. 
      * @param entities_and_systems 
      */
     function world(this: void, ...entities_and_systems: (Entity | System)[]): World;
     /**
      * Shortcut for adding multiple Entities and Systems to the World. Returns all added Entities and Systems. 
      * @param world 
      * @param entities_and_systems 
      * @returns added Entities and Systems
      */
     function add(this: void, world: World, ...entities_and_systems: (Entity | System)[]): (Entity | System)[];
     /**
      * Adds an Entity to the world. Also call this on Entities that have changed Components such that they match different Filters. Returns the Entity. 
      * @param world 
      * @param entity 
      * @returns added Entity
      */
     function addEntity(this: void, world: World, entity: Entity): Entity;
     /**
      * Adds a System to the world. Returns the System. 
      * @param world 
      * @param system 
      * @returns added System
      */
     function addSystem(this: void, world: World, system: System): System;
     /**
      * Removes an Entity from the World. Returns the Entity. 
      * @param world 
      * @param entity 
      * @returns removed Entity
      */
     function removeEntity(this: void, world: World, entity: Entity): Entity;
     /**
      * Removes an Entity from the System. Returns the System. 
      * @param world 
      * @param system 
      * @returns removed System
      */
     function removeSystem(this: void, world: World, system: System): System;
     /**
      *  Shortcut for removing multiple Entities and Systems from the World. Returns all removed Systems and Entities 
      * @param world 
      * @param entities_and_systems 
      * @returns all removed Systems and Entities
      */
     function remove(this: void, world: World, ...entities_and_systems: (Entity | System)[]): (Entity | System)[];
     /**
      * Manages Entities and Systems marked for deletion or addition.
      * Call this before modifying Systems and Entities outside of a call to `tiny.update`.
      * Do not call this within a call to `tiny.update`. 
      * @param world 
      */
     function refresh(this: void, world: World): void;
     /**
      * Updates the World by `dt` (delta time). Takes an optional parameter, `filter`, which is a Filter that selects Systems from the World, and updates only those Systems. If `filter` is not supplied, all Systems are updated. Put this function in your main loop. 
      * @param world 
      * @param dt 
      * @optional `filter` 
      */
     function update(this: void, world: World, dt: number, filter?: Filter): void;
     /**
      * Removes all Entities from the World. 
      * @param world 
      */
     function clearEntities(this: void, world: World): void;
     /**
      * Removes all Systems from the World. 
      * @param world 
      */
     function clearSystems(this: void, world: World): void;
     /**
      * Gets number of Entities in the World. 
      * @param world 
      */
     function getEntityCount(this: void, world: World): number;
     /**
      * Gets number of Systems in the World. 
      * @param world 
      */
     function getSystemCount(this: void, world: World): number;
     /**
      * Sets the index of a System in the World, and returns the old index. Changes the order in which they Systems processed, because lower indexed Systems are processed first. Returns the old system.index. 
      * @param world 
      * @param system 
      * @param index 
      * @returns old index of a `system`
      */
     function setSystemIndex(this: void, world: World, system: System, index: number): number;
 
     /**
      * A System is a wrapper around function callbacks for manipulating Entities. 
      * Systems are implemented as tables that contain at least one method (`update(dt)`); 
      * 
      */
     interface System extends LuaTable
     {
         filter: Filter;
         update: (dt: number) => void;
         /**
          * Called when an Entity is added to the System.
          */
         onAdd?: (entity: Entity) => void;
         /**
          * Called when an Entity is removed from the System.
          */
         onRemove?: (entity: Entity) => void;
         /**
          * Called when the System is modified by adding or removing Entities from the System.
          */
         onModify?: (dt: number) => void;
         /**
          * Called when the System is added to the World, before any entities are added to the system.
          */
         onAddToWorld?: (world: World) => void;
         /**
          * Called when the System is removed from the world, after all Entities are removed from the System.
          */
         onRemovedFromWorld?: (world: World) => void;
         /**
          * Called on each system before update is called on any system.
          * 
          * The idea behind `preWrap` and `postWrap` is to allow for systems
          * that modify the behavior of other systems. 
          * Say there is a DrawingSystem, which draws sprites to the screen, 
          * and a PostProcessingSystem, that adds some blur and bloom effects. 
          * In the `preWrap` method of the PostProcessingSystem,
          * the System could set the drawing target for the DrawingSystem to a special buffer
          * instead the screen.
          * In the postWrap method, the PostProcessingSystem could then modify the buffer
          * and render it to the screen. 
          * In this setup, the PostProcessingSystem would be added to the World
          * after the drawingSystem
          * (A similar but less flexible behavior could be accomplished with a single custom update
          * function in the DrawingSystem).
          */
         preWrap?: (dt: number) => void;
         /**
          * Called on each system in reverse order after update is called on each system. 
          * 
          * The idea behind `preWrap` and `postWrap` is to allow for systems
          * that modify the behavior of other systems. 
          * Say there is a DrawingSystem, which draws sprites to the screen, 
          * and a PostProcessingSystem, that adds some blur and bloom effects. 
          * In the `preWrap` method of the PostProcessingSystem,
          * the System could set the drawing target for the DrawingSystem to a special buffer
          * instead the screen.
          * In the postWrap method, the PostProcessingSystem could then modify the buffer
          * and render it to the screen. 
          * In this setup, the PostProcessingSystem would be added to the World
          * after the drawingSystem
          * (A similar but less flexible behavior could be accomplished with a single custom update
          * function in the DrawingSystem). 
          */
         postWrap?: (dt: number) => void;
     }
     /**
      * Creates a new System or System class from the supplied table. If table is nil, creates a new table. 
      * @optional `table`
      */
     function system(this: void, _table?: LuaTable): System;
     /**
      * Processing Systems process each entity individual, and are usually what is needed. Processing Systems have three extra callbacks besides those inheritted from vanilla Systems.
      * - `preProcess(dt)` - Called before iteration.
      * - `process(entity, dt)` - Process each entity.
      * - `postProcess(dt)` - Called after iteration.
      */
     interface ProcessingSystem extends System
     {
         preProcess(dt: number): void;
         process(entity: Entity, dt: number): void;
         postProcess(dt: number): void;
     }
     /**
      * Creates a new Processing System or Processing System class. Processing Systems process each entity individual, and are usually what is needed. Processing Systems have three extra callbacks besides those inheritted from vanilla Systems.
      * - `preProcess(dt)` - Called before iteration.
      * - `process(entity, dt)` - Process each entity.
      * - `postProcess(dt)` - Called after iteration.
      * @optional `table`
      */
     function processingSystem(this: void, _table?: LuaTable): ProcessingSystem;
     /**
      * Sorted Systems sort their Entities according to a user-defined method, `compare(e1: Entity, e2: Entity)`,
      * which should return true if `e1` should come before `e2` and false otherwise.
      * Sorted Systems also override the default System's `onModify` callback, so be careful if defining a custom callback.
      * However, for processing the sorted entities, consider `tiny.sortedProcessingSystem(table)`. 
      */
     interface SortedSystem extends System
     {
         /**
          * Function, which should return true if `e1` should come before `e2` and false otherwise
          * @param e1 
          * @param e2 
          */
         compare(e1: Entity, e2: Entity): boolean;
     }
     /**
      * Sorted Processing Systems have both the aspects of Processing Systems and Sorted Systems. 
      */
     interface SortedProcessingSystem extends ProcessingSystem, SortedSystem
     {
         /**
          * Function, which should return true if `e1` should come before `e2` and false otherwise
          * @param e1 
          * @param e2 
          */
         compare(e1: Entity, e2: Entity): boolean;
     }
     /**
      * Creates a new Sorted Processing System or Sorted Processing System class. Sorted Processing Systems have both the aspects of Processing Systems and Sorted Systems. 
      * @optional `table` 
      */
     function sortedProcessingSystem(this: void, _table?: LuaTable): ProcessingSystem;
 }