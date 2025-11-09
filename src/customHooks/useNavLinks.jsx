export default function useNavLinks() {
    const navLinks = [
        {
            name: 'Orders',
            url: 'orders',
        },{
            name: 'Create Order',
            url: 'createOrder',
        },
        {
            name: 'Products',
            url: 'products',
        },
    ];

    return navLinks;
}