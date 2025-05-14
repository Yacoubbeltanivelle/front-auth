import { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("Form submitted:", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes("@")) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    if (formData.name.trim().length < 3) {
      alert("Le nom doit contenir au moins 3 caractères.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      const response = await fetch(
        "https://offers-api.digistos.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Une erreur est survenue.";
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status} - ${errorMessage}`
        );
      }

      const data = await response.json();
      alert(`${data.name} a été créé`);
      console.log("Form submitted:", formData);
      navigate("/connexion");
    } catch (err) {
      console.log(err.message);
      alert(`L'utilisateur n'a pu être ajouté: ${err.message}`);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Créer un compte</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                S'inscrire
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
