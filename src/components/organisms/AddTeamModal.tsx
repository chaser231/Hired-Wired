"use client";

import { useState } from "react";
import { Modal } from "./Modal";
import { Button, Input, TextArea } from "@/components/atoms";
import { useTeamsStore } from "@/stores";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTeamModal({ isOpen, onClose }: AddTeamModalProps) {
  const addTeam = useTeamsStore((state) => state.addTeam);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [highlight, setHighlight] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    addTeam({
      name: name.trim(),
      description: description.trim() || undefined,
      peopleCount: 0,
      productivity: 0,
      highlight: highlight.trim() || undefined,
      avatars: [],
      memberIds: [],
    });
    
    // Reset form and close
    setName("");
    setDescription("");
    setHighlight("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setHighlight("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Team">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
        <Input
          label="Team Name"
          placeholder="e.g. Engineering"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <TextArea
          label="Description"
          placeholder="Brief description of the team..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        
        <Input
          label="Week Highlight"
          placeholder="e.g. Shipped new feature ahead of schedule"
          value={highlight}
          onChange={(e) => setHighlight(e.target.value)}
        />
        
        <div className="flex gap-[8px] justify-end pt-[14px]">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="cta-small">
            Add Team
          </Button>
        </div>
      </form>
    </Modal>
  );
}

