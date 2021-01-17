using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Items
{
    /// <summary>
    /// Base of all items in the game
    /// </summary>
    public abstract class BaseItem : Node2D, IItem
    {
        #region Public methods
        public static bool operator ==(BaseItem source, BaseItem target)
        {
            return source.Equals(target);
        }

        public static bool operator !=(BaseItem source, BaseItem target)
        {
            return ! source.Equals(target);
        }

        public override bool Equals(object obj)
        {
            return (obj is BaseItem item) && this.Id == item.Id;
        }
        #endregion

        #region Properties
        public virtual int Id { get; set; }
        #endregion
    }
}
