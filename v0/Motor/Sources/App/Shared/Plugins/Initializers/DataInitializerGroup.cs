using Godot;
using ladiagonaledupoulpe.Sources.App.Shared.Enums;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Initializers;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Initializers
{
    /// <summary>
    /// Collection of data initializers, with key to load it
    /// </summary>
    public class DataInitializerGroup : BaseDataInitializer, IDataInitializer, IList<IDataInitializer>
    {
        #region Fields
        private List<IDataInitializer> _dataInitializers = new List<IDataInitializer>();
        private DataInitializerStep _step;
        #endregion

        #region Constructors
        public DataInitializerGroup(DataInitializerStep step)
        {
            this._step = step;
        }
        #endregion

        #region Public methods
        public void Add(IDataInitializer item)
        {
            this._dataInitializers.Add(item);
            item.Connect(LoadDataType.DataLoaded.ToString(), this, nameof(Initializer_DataLoaded));
            this.AddChild(item as Node);
        }

        public void Clear()
        {
            this._dataInitializers.Clear();
        }

        public bool Contains(IDataInitializer item)
        {
            return this._dataInitializers.Contains(item);
        }

        public void CopyTo(IDataInitializer[] array, int arrayIndex)
        {
            this._dataInitializers.CopyTo(array, arrayIndex);
        }

        public IEnumerator<IDataInitializer> GetEnumerator()
        {
            return this._dataInitializers.GetEnumerator();
        }

        public int IndexOf(IDataInitializer item)
        {
            return this._dataInitializers.IndexOf(item);
        }

        public void Insert(int index, IDataInitializer item)
        {
            this._dataInitializers.Insert(index, item);
        }

        public override void Load()
        {
            this._dataInitializers.ForEach(item => item.Load());
        }

        public bool Remove(IDataInitializer item)
        {            
            bool isRemoved = this._dataInitializers.Remove(item);

            if (isRemoved)
            {
                this.RemoveChild(item as Node);
            }

            return isRemoved;
        }

        public void RemoveAt(int index)
        {
            this._dataInitializers.RemoveAt(index);
        }
        #endregion

        #region Internal methods
        private void Initializer_DataLoaded(Godot.Object sender, Godot.Object data)
        {
            IDataInitializer initializer = sender as IDataInitializer;

            if (this.All(item => item.IsLoaded))
            {
                this.IsLoaded = true;
                this.EmitSignal(LoadDataType.DataLoaded.ToString(), this, new Godot.Object());
            }
        }
        #endregion

        #region Properties
        public IDataInitializer this[int index] { get => this._dataInitializers[index]; set => this._dataInitializers[index] = value; }
        
        public override string Key => this._step.ToString();

        public int Count => this._dataInitializers.Count;

        public bool IsReadOnly => false;

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this._dataInitializers.GetEnumerator();
        }
        #endregion
    }
}
