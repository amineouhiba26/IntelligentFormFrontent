import { useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Trash2, Plus, Save, X } from "lucide-react"

export function FieldEditor({ missions, onSave, onClose }) {
  const [selectedMission, setSelectedMission] = useState(Object.keys(missions)[0])
  const [missionData, setMissionData] = useState(JSON.parse(JSON.stringify(missions)))
  const [editingField, setEditingField] = useState(null)
  const [newFieldName, setNewFieldName] = useState("")

  const currentMission = missionData[selectedMission]

  const handleAddField = () => {
    if (!newFieldName || currentMission.fields[newFieldName]) return

    const newField = {
      type: "text",
      label: newFieldName.charAt(0).toUpperCase() + newFieldName.slice(1),
      placeholder: `Enter ${newFieldName}`,
      required: false,
    }

    setMissionData({
      ...missionData,
      [selectedMission]: {
        ...currentMission,
        fields: {
          ...currentMission.fields,
          [newFieldName]: newField,
        },
      },
    })

    setNewFieldName("")
    setEditingField(newFieldName)
  }

  const handleDeleteField = (fieldName) => {
    const { [fieldName]: _, ...remainingFields } = currentMission.fields
    setMissionData({
      ...missionData,
      [selectedMission]: {
        ...currentMission,
        fields: remainingFields,
      },
    })
  }

  const handleUpdateField = (fieldName, property, value) => {
    setMissionData({
      ...missionData,
      [selectedMission]: {
        ...currentMission,
        fields: {
          ...currentMission.fields,
          [fieldName]: {
            ...currentMission.fields[fieldName],
            [property]: value,
          },
        },
      },
    })
  }

  const handleUpdateMissionInfo = (property, value) => {
    setMissionData({
      ...missionData,
      [selectedMission]: {
        ...currentMission,
        [property]: value,
      },
    })
  }

  const handleSave = () => {
    onSave(missionData)
  }

  const handleAddOption = (fieldName) => {
    const field = currentMission.fields[fieldName]
    const newOptions = [...(field.options || []), ""]
    handleUpdateField(fieldName, "options", newOptions)
  }

  const handleUpdateOption = (fieldName, index, value) => {
    const field = currentMission.fields[fieldName]
    const newOptions = [...field.options]
    newOptions[index] = value
    handleUpdateField(fieldName, "options", newOptions)
  }

  const handleDeleteOption = (fieldName, index) => {
    const field = currentMission.fields[fieldName]
    const newOptions = field.options.filter((_, i) => i !== index)
    handleUpdateField(fieldName, "options", newOptions)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl bg-white dark:bg-slate-800 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Edit Mission Fields</h2>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={onClose} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>

        {/* Mission Selector */}
        <div className="mb-6">
          <Label className="font-medium text-emerald-900 dark:text-emerald-100">Select Mission</Label>
          <Select value={selectedMission} onValueChange={setSelectedMission}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(missionData).map((key) => (
                <SelectItem key={key} value={key}>
                  {missionData[key].title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mission Info Editor */}
        <div className="space-y-4 mb-6 p-4 bg-emerald-50 dark:bg-slate-700 rounded-lg">
          <div>
            <Label className="font-medium text-emerald-900 dark:text-emerald-100">Mission Title</Label>
            <Input
              value={currentMission.title}
              onChange={(e) => handleUpdateMissionInfo("title", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="font-medium text-emerald-900 dark:text-emerald-100">Description</Label>
            <Textarea
              value={currentMission.description}
              onChange={(e) => handleUpdateMissionInfo("description", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label className="font-medium text-emerald-900 dark:text-emerald-100">Confirmation Message</Label>
            <Textarea
              value={currentMission.confirmation}
              onChange={(e) => handleUpdateMissionInfo("confirmation", e.target.value)}
              className="mt-2"
              rows={3}
            />
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              Use [name], [email], [amount], [frequency], [topic], [year] as placeholders
            </p>
          </div>
        </div>

        {/* Fields Editor */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Form Fields</h3>
          
          {Object.entries(currentMission.fields).map(([fieldName, field]) => (
            <Card key={fieldName} className="p-4 border-2 border-emerald-200 dark:border-emerald-800">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">{fieldName}</h4>
                <Button
                  onClick={() => handleDeleteField(fieldName)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">Label</Label>
                  <Input
                    value={field.label}
                    onChange={(e) => handleUpdateField(fieldName, "label", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm">Type</Label>
                  <Select
                    value={field.type}
                    onValueChange={(value) => handleUpdateField(fieldName, "type", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Placeholder</Label>
                  <Input
                    value={field.placeholder || ""}
                    onChange={(e) => handleUpdateField(fieldName, "placeholder", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm">Required</Label>
                  <Select
                    value={field.required ? "true" : "false"}
                    onValueChange={(value) => handleUpdateField(fieldName, "required", value === "true")}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {field.type === "number" && (
                  <div>
                    <Label className="text-sm">Minimum Value</Label>
                    <Input
                      type="number"
                      value={field.min || ""}
                      onChange={(e) => handleUpdateField(fieldName, "min", parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                )}

                {(field.type === "select" || field.type === "checkbox") && (
                  <div className="col-span-2">
                    <Label className="text-sm">Options</Label>
                    <div className="space-y-2 mt-2">
                      {(field.options || []).map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={option}
                            onChange={(e) => handleUpdateOption(fieldName, index, e.target.value)}
                          />
                          <Button
                            onClick={() => handleDeleteOption(fieldName, index)}
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() => handleAddOption(fieldName)}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add New Field */}
        <Card className="p-4 border-2 border-dashed border-emerald-300 dark:border-emerald-700">
          <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Add New Field</h4>
          <div className="flex gap-2">
            <Input
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
              placeholder="Field name (e.g., phone_number)"
              className="flex-1"
            />
            <Button onClick={handleAddField} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  )
}
