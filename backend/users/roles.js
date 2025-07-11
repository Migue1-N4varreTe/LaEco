const ROLES = {
  DEVELOPER: "LEVEL_5_DEVELOPER",
  OWNER: "LEVEL_4_OWNER",
  MANAGER: "LEVEL_3_MANAGER",
  SUPERVISOR: "LEVEL_2_SUPERVISOR",
  CASHIER: "LEVEL_1_CASHIER",
};

const PERMISSIONS = {
  // Sales permissions
  SALES: {
    CREATE_ORDER: "sales:create_order",
    PROCESS_PAYMENT: "sales:process_payment",
    APPLY_DISCOUNT: "sales:apply_discount",
    HANDLE_RETURN: "sales:handle_return",
    VIEW_SALES: "sales:view_sales",
  },

  // Inventory permissions
  INVENTORY: {
    VIEW: "inventory:view",
    ADD_ITEM: "inventory:add_item",
    UPDATE_ITEM: "inventory:update_item",
    DELETE_ITEM: "inventory:delete_item",
    MANAGE_SUPPLIERS: "inventory:manage_suppliers",
    VIEW_LOW_STOCK: "inventory:view_low_stock",
  },

  // Reports permissions
  REPORTS: {
    VIEW_SALES: "reports:view_sales",
    VIEW_FINANCIAL: "reports:view_financial",
    VIEW_INVENTORY: "reports:view_inventory",
    VIEW_EMPLOYEES: "reports:view_employees",
    EXPORT_DATA: "reports:export_data",
  },

  // Staff management permissions
  STAFF: {
    VIEW: "staff:view",
    CREATE: "staff:create",
    UPDATE: "staff:update",
    DELETE: "staff:delete",
    MANAGE_ROLES: "staff:manage_roles",
    VIEW_ATTENDANCE: "staff:view_attendance",
  },

  // Business management permissions
  BUSINESS: {
    MANAGE_PRICING: "business:manage_pricing",
    MANAGE_STORES: "business:manage_stores",
    MANAGE_POLICIES: "business:manage_policies",
    VIEW_ANALYTICS: "business:view_analytics",
  },

  // Customer management permissions
  CUSTOMERS: {
    VIEW_BASIC: "customers:view_basic",
    VIEW_DETAILED: "customers:view_detailed",
    MANAGE_LOYALTY: "customers:manage_loyalty",
    HANDLE_COMPLAINTS: "customers:handle_complaints",
  },
};

const ROLE_PERMISSIONS = {
  [ROLES.DEVELOPER]: ["*"], // Full access

  [ROLES.OWNER]: [
    // Sales
    PERMISSIONS.SALES.CREATE_ORDER,
    PERMISSIONS.SALES.PROCESS_PAYMENT,
    PERMISSIONS.SALES.APPLY_DISCOUNT,
    PERMISSIONS.SALES.HANDLE_RETURN,
    PERMISSIONS.SALES.VIEW_SALES,

    // Inventory
    PERMISSIONS.INVENTORY.VIEW,
    PERMISSIONS.INVENTORY.ADD_ITEM,
    PERMISSIONS.INVENTORY.UPDATE_ITEM,
    PERMISSIONS.INVENTORY.DELETE_ITEM,
    PERMISSIONS.INVENTORY.MANAGE_SUPPLIERS,
    PERMISSIONS.INVENTORY.VIEW_LOW_STOCK,

    // Reports
    PERMISSIONS.REPORTS.VIEW_SALES,
    PERMISSIONS.REPORTS.VIEW_FINANCIAL,
    PERMISSIONS.REPORTS.VIEW_INVENTORY,
    PERMISSIONS.REPORTS.VIEW_EMPLOYEES,
    PERMISSIONS.REPORTS.EXPORT_DATA,

    // Staff
    PERMISSIONS.STAFF.VIEW,
    PERMISSIONS.STAFF.CREATE,
    PERMISSIONS.STAFF.UPDATE,
    PERMISSIONS.STAFF.DELETE,
    PERMISSIONS.STAFF.MANAGE_ROLES,
    PERMISSIONS.STAFF.VIEW_ATTENDANCE,

    // Business
    PERMISSIONS.BUSINESS.MANAGE_PRICING,
    PERMISSIONS.BUSINESS.MANAGE_STORES,
    PERMISSIONS.BUSINESS.MANAGE_POLICIES,
    PERMISSIONS.BUSINESS.VIEW_ANALYTICS,

    // Customers
    PERMISSIONS.CUSTOMERS.VIEW_BASIC,
    PERMISSIONS.CUSTOMERS.VIEW_DETAILED,
    PERMISSIONS.CUSTOMERS.MANAGE_LOYALTY,
    PERMISSIONS.CUSTOMERS.HANDLE_COMPLAINTS,
  ],

  [ROLES.MANAGER]: [
    // Sales
    PERMISSIONS.SALES.CREATE_ORDER,
    PERMISSIONS.SALES.PROCESS_PAYMENT,
    PERMISSIONS.SALES.APPLY_DISCOUNT,
    PERMISSIONS.SALES.HANDLE_RETURN,
    PERMISSIONS.SALES.VIEW_SALES,

    // Inventory
    PERMISSIONS.INVENTORY.VIEW,
    PERMISSIONS.INVENTORY.ADD_ITEM,
    PERMISSIONS.INVENTORY.UPDATE_ITEM,
    PERMISSIONS.INVENTORY.VIEW_LOW_STOCK,

    // Reports
    PERMISSIONS.REPORTS.VIEW_SALES,
    PERMISSIONS.REPORTS.VIEW_INVENTORY,
    PERMISSIONS.REPORTS.VIEW_EMPLOYEES,

    // Staff
    PERMISSIONS.STAFF.VIEW,
    PERMISSIONS.STAFF.UPDATE,
    PERMISSIONS.STAFF.VIEW_ATTENDANCE,

    // Customers
    PERMISSIONS.CUSTOMERS.VIEW_BASIC,
    PERMISSIONS.CUSTOMERS.VIEW_DETAILED,
    PERMISSIONS.CUSTOMERS.HANDLE_COMPLAINTS,
  ],

  [ROLES.SUPERVISOR]: [
    // Sales
    PERMISSIONS.SALES.CREATE_ORDER,
    PERMISSIONS.SALES.PROCESS_PAYMENT,
    PERMISSIONS.SALES.VIEW_SALES,

    // Inventory
    PERMISSIONS.INVENTORY.VIEW,
    PERMISSIONS.INVENTORY.VIEW_LOW_STOCK,

    // Reports
    PERMISSIONS.REPORTS.VIEW_SALES,

    // Staff
    PERMISSIONS.STAFF.VIEW,
    PERMISSIONS.STAFF.VIEW_ATTENDANCE,

    // Customers
    PERMISSIONS.CUSTOMERS.VIEW_BASIC,
    PERMISSIONS.CUSTOMERS.HANDLE_COMPLAINTS,
  ],

  [ROLES.CASHIER]: [
    // Sales
    PERMISSIONS.SALES.CREATE_ORDER,
    PERMISSIONS.SALES.PROCESS_PAYMENT,

    // Inventory
    PERMISSIONS.INVENTORY.VIEW,

    // Customers
    PERMISSIONS.CUSTOMERS.VIEW_BASIC,
  ],
};

const ROLE_HIERARCHY = {
  [ROLES.DEVELOPER]: 5,
  [ROLES.OWNER]: 4,
  [ROLES.MANAGER]: 3,
  [ROLES.SUPERVISOR]: 2,
  [ROLES.CASHIER]: 1,
};

const CAN_ASSIGN_ROLES = {
  [ROLES.DEVELOPER]: [
    ROLES.OWNER,
    ROLES.MANAGER,
    ROLES.SUPERVISOR,
    ROLES.CASHIER,
  ],
  [ROLES.OWNER]: [ROLES.OWNER, ROLES.MANAGER, ROLES.SUPERVISOR, ROLES.CASHIER],
  [ROLES.MANAGER]: [ROLES.SUPERVISOR, ROLES.CASHIER],
  [ROLES.SUPERVISOR]: [ROLES.CASHIER],
  [ROLES.CASHIER]: [],
};

export {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  ROLE_HIERARCHY,
  CAN_ASSIGN_ROLES,
};
