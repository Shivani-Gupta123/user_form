import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
}

const DepartmentList: React.FC = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const departments: Department[] = [
    {
      id: 1,
      name: 'customer_service',
      subDepartments: [
        { id: 1, name: 'support' },
        { id: 2, name: 'customer_success' },
      ],
    },
    {
      id: 2,
      name: 'design',
      subDepartments: [
        { id: 4, name: 'graphic_design' },
        { id: 5, name: 'product_design' },
        { id: 6, name: 'web_design' },
      ],
    },
  ];

  const handleToggleDepartment = (departmentId: number) => {
    if (expandedDepartments.includes(departmentId)) {
      setExpandedDepartments(expandedDepartments.filter((id) => id !== departmentId));
      setSelectedItems(selectedItems.filter((itemId) => departments.find((department) => department.id === departmentId)?.subDepartments.every((subDept) => subDept.id !== itemId)));
    } else {
      setExpandedDepartments([...expandedDepartments, departmentId]);
      setSelectedItems([...selectedItems, ...departments.find((department) => department.id === departmentId)?.subDepartments.map((subDept) => subDept.id) || []]);
    }
  };

  const handleToggleSubDepartment = (subDepartmentId: number) => {
    if (selectedItems.includes(subDepartmentId)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== subDepartmentId));
    } else {
      setSelectedItems([...selectedItems, subDepartmentId]);
    }
  };

  const isDepartmentSelected = (departmentId: number) => {
    const subDepartments = departments.find((department) => department.id === departmentId)?.subDepartments;
    return subDepartments && subDepartments.every((subDept) => selectedItems.includes(subDept.id));
  };

  return (
    <List style={{padding: "20px 10px", margin: "30px 0", border: "1px solid black"}}>
      <h4>Choose Department</h4>
      {departments.map((department) => (
        <div key={department.id}>
          <ListItem onClick={() => handleToggleDepartment(department.id)}>
            <Checkbox checked={isDepartmentSelected(department.id)} />
            <ListItemText primary={department.name} />
            {expandedDepartments.includes(department.id) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={expandedDepartments.includes(department.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem key={subDepartment.id} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={selectedItems.includes(subDepartment.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSubDepartment(subDepartment.id);
                    }}
                  />
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;




