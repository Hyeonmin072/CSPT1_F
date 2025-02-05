export const MenuContent = () => {
  const menuItems = [
    { id: 1, title: "메뉴 1", href: "#" },
    { id: 2, title: "메뉴 2", href: "#" },
    { id: 3, title: "메뉴 3", href: "#" },
  ];

  return (
    <nav className="px-4 py-6">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="block p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
