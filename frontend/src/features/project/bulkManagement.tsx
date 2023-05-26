/**
 * This component exposes a bootstrap Alert to display the number of selected images
 * and facilitate operating on the selected images in bulk - updating their queries,
 * setting their selected versions, or deleting them from the project.
 */

import React, { FormEvent, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { useDispatch, useSelector } from "react-redux";

import { useGetSampleCardsQuery } from "@/app/api";
import { RootState } from "@/app/store";
import { AppDispatch } from "@/app/store";
import { Card } from "@/common/constants";
import { Faces, SearchQuery } from "@/common/types";
import { selectBackendURL } from "@/features/backend/backendSlice";
import { GridSelector } from "@/features/card/gridSelector";
import {
  bulkDeleteSlots,
  bulkSetMemberSelection,
  bulkSetQuery,
  bulkSetSelectedImage,
  selectSelectedSlots,
} from "@/features/project/projectSlice";

interface MutateSelectedImageQueriesProps {
  slots: Array<[Faces, number]>;
}

function ChangeSelectedImageSelectedImages({
  slots,
}: MutateSelectedImageQueriesProps) {
  /**
   * sorry for the stupid naming convention here 🗿
   */

  // TODO: this component is fairly messy and should be tidied up

  const dispatch = useDispatch<AppDispatch>();

  const [
    showChangeSelectedImageSelectedImagesModal,
    setShowChangeSelectedImageSelectedImagesModal,
  ] = useState<boolean>(false);
  const handleCloseChangeSelectedImageSelectedImagesModal = () =>
    setShowChangeSelectedImageSelectedImagesModal(false);
  const handleShowChangeSelectedImageSelectedImagesModal = () =>
    setShowChangeSelectedImageSelectedImagesModal(true);

  const onSubmit = (selectedImage: string): void => {
    dispatch(bulkSetSelectedImage({ selectedImage, slots }));
    handleCloseChangeSelectedImageSelectedImagesModal();
  };

  const firstQuery: SearchQuery | null = useSelector((state: RootState) =>
    slots.length > 0 && slots[0] != null
      ? state.project.members[slots[0][1]][slots[0][0]].query
      : null
  );
  const allSelectedProjectMembersHaveTheSameQuery: boolean = useSelector(
    (state: RootState) =>
      firstQuery != null &&
      slots.every(
        ([face, slot]) =>
          (state.project.members[slot] ?? {})[face]?.query?.query ==
            firstQuery.query &&
          (state.project.members[slot] ?? {})[face]?.query?.card_type ==
            firstQuery.card_type
      )
  );
  const searchResultsForQuery: Array<string> = useSelector((state: RootState) =>
    firstQuery != null &&
    firstQuery.query != null &&
    allSelectedProjectMembersHaveTheSameQuery
      ? (state.searchResults.searchResults[firstQuery.query] ?? {})[
          firstQuery.card_type
        ] ?? []
      : []
  );

  return (
    <>
      {searchResultsForQuery.length > 1 &&
        allSelectedProjectMembersHaveTheSameQuery && (
          <Dropdown.Item
            className="text-decoration-none"
            onClick={handleShowChangeSelectedImageSelectedImagesModal}
          >
            <i className="bi bi-image" style={{ paddingRight: 0.5 + "em" }} />{" "}
            Change Version
          </Dropdown.Item>
        )}
      <GridSelector
        testId="bulk-grid-selector"
        imageIdentifiers={searchResultsForQuery}
        show={showChangeSelectedImageSelectedImagesModal}
        handleClose={handleCloseChangeSelectedImageSelectedImagesModal}
        onClick={onSubmit}
      />
    </>
  );
}

function ChangeSelectedImageQueries({
  slots,
}: MutateSelectedImageQueriesProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [
    showChangeSelectedImageQueriesModal,
    setShowChangeSelectedImageQueriesModal,
  ] = useState<boolean>(false);
  const handleCloseChangeSelectedImageQueriesModal = () =>
    setShowChangeSelectedImageQueriesModal(false);
  const handleShowChangeSelectedImageQueriesModal = () =>
    setShowChangeSelectedImageQueriesModal(true);
  const [
    changeSelectedImageQueriesModalValue,
    setChangeSelectedImageQueriesModalValue,
  ] = useState("");

  const handleSubmitChangeSelectedImageQueriesModal = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // to avoid reloading the page
    dispatch(
      bulkSetQuery({ query: changeSelectedImageQueriesModalValue, slots })
    );
    handleCloseChangeSelectedImageQueriesModal();
  };

  const backendURL = useSelector(selectBackendURL);
  const sampleCardsQuery = useGetSampleCardsQuery(undefined, {
    skip: backendURL == null,
  });
  const placeholderCardName =
    sampleCardsQuery.data != null &&
    (sampleCardsQuery.data ?? {})[Card][0] != null
      ? sampleCardsQuery.data[Card][0].name
      : "";

  return (
    <>
      <Dropdown.Item
        className="text-decoration-none"
        onClick={handleShowChangeSelectedImageQueriesModal}
      >
        <i
          className="bi bi-arrow-repeat"
          style={{ paddingRight: 0.5 + "em" }}
        />{" "}
        Change Query
      </Dropdown.Item>
      <Modal
        show={showChangeSelectedImageQueriesModal}
        onHide={handleCloseChangeSelectedImageQueriesModal}
        onExited={() => setChangeSelectedImageQueriesModalValue("")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Type in a query to update the selected images with and hit{" "}
          <b>Submit</b>.
          <hr />
          <Form
            onSubmit={handleSubmitChangeSelectedImageQueriesModal}
            id="changeSelectedImageQueriesForm"
          >
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder={placeholderCardName}
                onChange={(event) =>
                  setChangeSelectedImageQueriesModalValue(event.target.value)
                }
                value={changeSelectedImageQueriesModalValue}
                aria-label="change-selected-image-queries-text"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseChangeSelectedImageQueriesModal}
          >
            Close
          </Button>
          <Button
            type="submit"
            form="changeSelectedImageQueriesForm"
            variant="primary"
            aria-label="change-selected-image-queries-submit"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DeleteSelectedImages({ slots }: MutateSelectedImageQueriesProps) {
  const dispatch = useDispatch<AppDispatch>();

  const slotNumbers = slots.map(([face, slot]) => slot);
  const onClick = () => dispatch(bulkDeleteSlots({ slots: slotNumbers }));

  return (
    <Dropdown.Item onClick={onClick} className="text-decoration-none">
      <i className="bi bi-x-circle" style={{ paddingRight: 0.5 + "em" }} />{" "}
      Delete Slots
    </Dropdown.Item>
  );
}

export function SelectedImagesStatus() {
  const slots = useSelector(selectSelectedSlots);

  const dispatch = useDispatch<AppDispatch>();
  const onClick = () =>
    dispatch(bulkSetMemberSelection({ selectedStatus: false, slots }));

  return (
    <>
      <Alert
        variant="primary"
        style={{ display: slots.length > 0 ? "" : "none" }}
      >
        <Stack direction="horizontal" gap={2}>
          {slots.length} image
          {slots.length != 1 && "s"} selected.
          <Button
            onClick={onClick}
            className="ms-auto"
            data-testid="clear-selection"
          >
            <i className="bi bi-x-lg" />
          </Button>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">Modify</Dropdown.Toggle>
            <Dropdown.Menu>
              <ChangeSelectedImageSelectedImages slots={slots} />
              <ChangeSelectedImageQueries slots={slots} />
              <DeleteSelectedImages slots={slots} />
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Alert>
    </>
  );
}