import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export function DynamicForm({ fields, onSubmit, isLoading = false }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
  })

  const watchedCheckboxes = watch()

  const renderField = (fieldName, config) => {
    const fieldId = `field-${fieldName}`
    const error = errors[fieldName]

    const baseInputClass =
      "w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200"

    if (config.type === "text" || config.type === "email") {
      return (
        <div key={fieldName} className="space-y-2">
          <Label htmlFor={fieldId} className="font-medium text-emerald-900 dark:text-emerald-100">
            {config.label}
            {config.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            {...register(fieldName, {
              required: config.required ? `${config.label} is required` : false,
              pattern:
                config.type === "email"
                  ? {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    }
                  : undefined,
            })}
            id={fieldId}
            type={config.type}
            placeholder={config.placeholder}
            className={baseInputClass}
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )
    }

    if (config.type === "number") {
      return (
        <div key={fieldName} className="space-y-2">
          <Label htmlFor={fieldId} className="font-medium text-emerald-900 dark:text-emerald-100">
            {config.label}
            {config.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            {...register(fieldName, {
              required: config.required ? `${config.label} is required` : false,
              min: config.min
                ? {
                    value: config.min,
                    message: `Must be at least ${config.min}`,
                  }
                : undefined,
            })}
            id={fieldId}
            type="number"
            placeholder={config.placeholder}
            className={baseInputClass}
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )
    }

    if (config.type === "textarea") {
      return (
        <div key={fieldName} className="space-y-2">
          <Label htmlFor={fieldId} className="font-medium text-emerald-900 dark:text-emerald-100">
            {config.label}
            {config.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Textarea
            {...register(fieldName, {
              required: config.required ? `${config.label} is required` : false,
            })}
            id={fieldId}
            placeholder={config.placeholder}
            className={baseInputClass}
            disabled={isLoading}
            rows={4}
          />
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )
    }

    if (config.type === "select") {
      return (
        <div key={fieldName} className="space-y-2">
          <Label htmlFor={fieldId} className="font-medium text-emerald-900 dark:text-emerald-100">
            {config.label}
            {config.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Select onValueChange={(value) => setValue(fieldName, value)} disabled={isLoading}>
            <SelectTrigger className={baseInputClass}>
              <SelectValue placeholder={`Select ${config.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {config.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )
    }

    if (config.type === "checkbox") {
      return (
        <div key={fieldName} className="space-y-2">
          <Label className="font-medium text-emerald-900 dark:text-emerald-100">
            {config.label}
            {config.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div className="space-y-2">
            {config.options.map((option) => (
              <div key={option} className="flex items-center gap-3">
                <Checkbox
                  id={`${fieldName}-${option}`}
                  {...register(fieldName, {
                    required: config.required ? `${config.label} is required` : false,
                  })}
                  value={option}
                  onChange={(e) => {
                    const current = watchedCheckboxes[fieldName] || []
                    const newValue = Array.isArray(current) ? current : []

                    if (e.target.checked) {
                      setValue(fieldName, [...newValue, option])
                    } else {
                      setValue(
                        fieldName,
                        newValue.filter((v) => v !== option),
                      )
                    }
                  }}
                  disabled={isLoading}
                />
                <Label htmlFor={`${fieldName}-${option}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )
    }

    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {Object.entries(fields).map(([fieldName, config]) => renderField(fieldName, config))}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 dark:from-emerald-500 dark:via-teal-500 dark:to-cyan-500 dark:hover:from-emerald-600 dark:hover:via-teal-600 dark:hover:to-cyan-600 text-white py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Submit →"
        )}
      </Button>
    </form>
  )
}
