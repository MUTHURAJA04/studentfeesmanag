import detail from "../models/detailsmodel.js";

export const detailindex = async (req, res) => {
  try {
    const details = await detail.find();
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const detailcreate = async (req, res) => {
  const newdetail = new detail({
   
    register: req.body.register,
    name: req.body.name,
    course: req.body.course,
    fees: req.body.fees,
  });
  try {
    const detail = await newdetail.save();
    return res.status(201).json(detail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const detailupdate = async (req, res) => {
  try {

    const detailToUpdate = await detail.findById(req.params.id);
    if (!detailToUpdate) {
      return res.status(404).json({ message: "CANNOT FIND THAT DETAIL" });
    }


   
    if (req.body.register != null) {
      detailToUpdate.register = req.body.register;
    }
    if (req.body.name != null) {
      detailToUpdate.name = req.body.name;
    }
    if (req.body.course != null) {
      detailToUpdate.course = req.body.course;
    }
    if (req.body.fees != null) {
      detailToUpdate.fees = req.body.fees;
    }



   
    const updatedDetail = await detailToUpdate.save();

    res.json(updatedDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const detaildelete = async (req, res) => {
  try {
    const detailToDelete = await detail.findByIdAndDelete(req.params.id);

    if (!detailToDelete) {
      return res.status(404).json({ message: "CANNOT FIND THAT DETAIL" });
    }

    res.json({ message: "DETAIL DELETED SUCCESSFULLY" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const singledetail = async (req, res) => {
  try {
    const detailData = await detail.findById(req.params.id);
    if (detailData == null) {
      return res.status(404).json({ message: "CANNOT FIND THAT DETAIL" });
    } else {
      res.json(detailData);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
