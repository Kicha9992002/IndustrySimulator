export class Product {
    static readonly apples = new Product(
        0,
        'apples',
        'assets/products/apples.svg'
    );
    static readonly cherries = new Product(
        1,
        'cherries',
        'assets/products/cherries.svg'
    );
    static readonly logs = new Product(
        2,
        'logs',
        'assets/products/logs.svg'
    );

    private constructor(
        public id: number,
        public name: string,
        public imgPath: string,
        public amount: number = 0,
        public lastIncome: number = 0
    ) {}
}