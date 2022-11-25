export enum Key {
    DOWN,
    UP,
}

export class KeyHandler {
    private pressingKeys: Set<Key> = new Set()

    getPressingKeys(): Set<Key> {
        return this.pressingKeys
    }

    onKeyDown({ key }: KeyboardEvent) {
        switch (key) {
            case 'ArrowDown':
                this.pressingKeys.add(Key.DOWN)
            case 'ArrowUp': case ' ':
                this.pressingKeys.add(Key.UP)
                break;
        }
    }

    onKeyUp({ key }: KeyboardEvent) {
        switch (key) {
            case 'ArrowDown':
                this.pressingKeys.delete(Key.DOWN)
            case 'ArrowUp': case ' ':
                this.pressingKeys.delete(Key.UP)
                break;
        }
    }
}
