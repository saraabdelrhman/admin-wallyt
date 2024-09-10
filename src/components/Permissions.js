import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Pagination,
  Form,
} from "react-bootstrap";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Permission = () => {
  const [permissions, setPermissions] = useState([]); // State for handling multiple permissions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const fakeData = {
    permissions: [
      { id: "1", name: "Admin", permissions: "Full Access" },
      { id: "2", name: "Editor", permissions: "Edit Content" },
      { id: "3", name: "Viewer", permissions: "View Only" },
      { id: "4", name: "Moderator", permissions: "Manage Comments" },
      { id: "5", name: "Contributor", permissions: "Submit Content" },
    ],
    totalPages: 1, // Assume only 1 page of fake data
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://wallyt.com/permissions?page=${page}&size=${size}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch permissions data");
        }
        const data = await response.json();
        setPermissions(data.permissions); // Assuming `permissions` is an array in the API response
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setPermissions(fakeData.permissions); // Use fake data if the API request fails
        setTotalPages(fakeData.totalPages);
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [page, size]); // Refetch data when page or size changes

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this permission? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`https://wallyt.com/permission/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to delete permission");
        }
        alert("Permission deleted successfully!");
        setPermissions(
          permissions.filter((permission) => permission.id !== id)
        ); // Remove deleted permission from the list
      } catch (error) {
        alert(`Error deleting permission: ${error.message}`);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(0); // Reset to the first page when size changes
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Permissions Management</h2>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search permissions by name or access level"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>

        {/* Add New Role Button */}
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to="/newpermission">
            <Button className="btn btn-warning" size="md">
              + Add New Permission
            </Button>
          </Link>
        </Col>
      </Row>

      {error && (
        <div className="alert alert-warning">
          Using fake data due to error: {error}
        </div>
      )}

      {/* Items per page selection */}
      <Row className="mb-4">
        <Col>
          <Form.Label>Items per page:</Form.Label>
          <Form.Select
            onChange={handleSizeChange}
            value={size}
            style={{ width: "150px" }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Permissions Table */}
      <Table
        responsive="md"
        striped
        bordered
        hover
        className="permissions-table"
      >
        <thead className="bg-dark text-white">
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            permissions.map((permission) => (
              <tr key={permission.id}>
                <td>{permission.name}</td>
                <td>{permission.permissions}</td>
                <td>
                  <Link to={"/permissionsview"}>
                    <Button
                      size="sm"
                      className="me-2 mb-1 text-info"
                      variant="light"
                    >
                      <FaEye />
                    </Button>
                  </Link>
                  <Link to={"/permissionsedit"}>
                    <Button
                      size="sm"
                      className="me-2 mb-1 text-success"
                      variant="light"
                    >
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="me-2 mb-1 text-danger"
                    variant="light"
                    onClick={() => handleDelete(permission.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination Section */}
      <Pagination className="mt-3">
        <Pagination.First
          onClick={() => handlePageChange(0)}
          disabled={page === 0}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        />
        {[...Array(totalPages).keys()].map((p) => (
          <Pagination.Item
            key={p}
            active={p === page}
            onClick={() => handlePageChange(p)}
          >
            {p + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={page === totalPages - 1}
        />
      </Pagination>
    </Container>
  );
};

export default Permission;
