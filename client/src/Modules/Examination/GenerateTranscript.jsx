import React, { useState } from "react";
import { Button, Select, Container, Text, Group, Space } from "@mantine/core";
// import CustomBreadcrumbs from "../../components/Breadcrumbs.jsx";
import Transcript from "./components/Transcript.jsx";

function GenerateTranscript() {
  const [formData, setFormData] = useState({
    program: "",
    batch: "",
    semester: "",
    specialization: "",
  });

  const [showTranscript, setShowTranscript] = useState(false);

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowTranscript(true);
  };

  return (
    <div className="generate">
    <Container size="md" className="min-h-screen p-6">
      <Text size="xl" weight={700} className="mb-6">
        Generate Transcript
      </Text>
      <form onSubmit={handleSubmit}>
        <Group grow spacing="md">
          {/* Program */}
          <Select
            label="Program"
            placeholder="Select Program"
            data={[
              { value: "btech", label: "B.Tech" },
              { value: "bdes", label: "B.Des" },
              { value: "mtech", label: "M.Tech" },
              { value: "mdes", label: "M.Des" },
            ]}
            value={formData.program}
            onChange={handleChange("program")}
          />

          {/* Batch */}
          <Select
            label="Batch"
            placeholder="Select Batch"
            data={[
              { value: "2021", label: "2021" },
              { value: "2022", label: "2022" },
              { value: "2023", label: "2023" },
              { value: "2024", label: "2024" },
            ]}
            value={formData.batch}
            onChange={handleChange("batch")}
          />

          {/* Semester */}
          <Select
            label="Semester"
            placeholder="Select Semester"
            data={Array.from({ length: 8 }, (_, i) => ({
              value: `${i + 1}`,
              label: `Semester ${i + 1}`,
            }))}
            value={formData.semester}
            onChange={handleChange("semester")}
          />

          {/* Specialization */}
          <Select
            label="Specialization"
            placeholder="Select Specialization"
            data={[
              { value: "cse", label: "CSE" },
              { value: "ece", label: "ECE" },
              { value: "me", label: "ME" },
              { value: "sm", label: "SM" },
              { value: "design", label: "Design" },
            ]}
            value={formData.specialization}
            onChange={handleChange("specialization")}
          />
        </Group>

        <Space h="md" />

        <Button type="submit" onClick={handleSubmit} variant="filled">
          Search
        </Button>
      </form>

      {showTranscript && <Transcript data={formData} />}
    </Container>
    </div>
  );
}

export default GenerateTranscript;
